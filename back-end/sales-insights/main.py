import asyncio
import logging
import os
import uuid
from datetime import datetime

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from semantic_kernel import Kernel
from semantic_kernel.connectors.ai.open_ai import AzureChatCompletion
from semantic_kernel.contents.chat_history import ChatHistory
from semantic_kernel.contents.utils.author_role import AuthorRole
from models.chat_models import ChatRequest, ChatResponse
from agents.orchestrator import OrchestratorAgent
from dotenv import load_dotenv

# -------------------------------
#  Setup
# -------------------------------
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("chat_api")

app = FastAPI(title="Sales Conversational Orchestrator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
#  Azure OpenAI Config
# -------------------------------
api_key = os.getenv("AZURE_OPENAI_API_KEY")
endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
api_version = os.getenv("AZURE_OPENAI_API_VERSION")
deployment = os.getenv("AZURE_DEPLOYMENT_NAME")

# -------------------------------
#  Kernel Setup
# -------------------------------
kernel = Kernel()
kernel.add_service(
    AzureChatCompletion(
        service_id="azure_openai_chat",
        deployment_name=deployment,
        endpoint=endpoint,
        api_key=api_key,
        api_version=api_version,
    )
)

logger.info("✅ Azure AI service added.")

# -------------------------------
#  Orchestrator Agent
# -------------------------------
orchestrator = OrchestratorAgent(kernel)

# -------------------------------
#  In-memory session stores + locks
# -------------------------------
chat_histories: dict[str, ChatHistory] = {}
session_locks: dict[str, asyncio.Lock] = {}

# -------------------------------
#  Helpers
# -------------------------------
def now_utc_iso() -> str:
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"

def ensure_session_lock(session_id: str) -> asyncio.Lock:
    if session_id not in session_locks:
        session_locks[session_id] = asyncio.Lock()
    return session_locks[session_id]

# -------------------------------
#  Endpoints
# -------------------------------
@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Handle a user message in a chat session:
    - Save user message (with id/timestamp) into ChatHistory
    - Call orchestrator.run(session_id, user_message, chat_history)
    - Save assistant reply (with id/timestamp) into ChatHistory
    - Return assistant reply
    """
    logger.info(f"POST /chat -> session_id={request.session_id}, message={request.message!r}")

    lock = ensure_session_lock(request.session_id)
    async with lock:
        # Ensure session history exists
        if request.session_id not in chat_histories:
            chat_histories[request.session_id] = ChatHistory()

        chat_history = chat_histories[request.session_id]

        # Validate message
        if not request.message or not request.message.strip():
            return {"reply": "Please enter a message."}

        # Persist user message with id and timestamp in metadata so GET /chat/history can return it
        user_msg_id = uuid.uuid4().hex
        user_ts = now_utc_iso()
        chat_history.add_user_message(request.message, metadata={"id": user_msg_id, "timestamp": user_ts})

        logger.info(f"[{request.session_id}] Saved user message id={user_msg_id}")

    # Call orchestrator outside the lock to avoid long-held locks during async agent calls,
    # but we pass the chat_history object (it is still referenced)
    try:
        result = await orchestrator.run(request.session_id, request.message, chat_history)
    except Exception as e:
        logger.exception("Orchestrator error")
        # record assistant error response
        error_text = "I encountered an internal error while processing your request."
        async with ensure_session_lock(request.session_id):
            chat_history.add_assistant_message(error_text, metadata={"id": uuid.uuid4().hex, "timestamp": now_utc_iso()})
        raise

    assistant_reply = result.get("reply", "")
    print(assistant_reply)
    print("---------------------")
    print(type(assistant_reply))
    # Save assistant reply with id/timestamp
    async with ensure_session_lock(request.session_id):
        assistant_msg_id = uuid.uuid4().hex
        assistant_ts = now_utc_iso()
        chat_history.add_assistant_message(assistant_reply, metadata={"id": assistant_msg_id, "timestamp": assistant_ts})
        logger.info(f"[{request.session_id}] Saved assistant message id={assistant_msg_id}")

    return {"reply": assistant_reply}

@app.get("/chat/history")
async def get_chat_history(session_id: str):
    """
    Return chat history in the format expected by frontend:
    {
      "messages": [
        { "id": "...", "content": "...", "role": "user"|"assistant", "timestamp": "2024-01-01T00:00:00Z" }
      ]
    }
    """
    lock = ensure_session_lock(session_id)
    async with lock:
        if session_id not in chat_histories:
            return {"messages": []}

        chat_history = chat_histories[session_id]
        out_msgs = []

        for message in chat_history.messages:
            # Skip system messages
            if getattr(message, "role", None) == AuthorRole.SYSTEM:
                continue

            # Map role strictly to "user" or "assistant"
            if getattr(message, "role", None) == AuthorRole.USER:
                role_val = "user"
            else:
                # any non-user role (assistant, tool, developer, etc.) is reported as "assistant"
                role_val = "assistant"

            metadata = getattr(message, "metadata", {}) or {}

            msg_id = metadata.get("id") or getattr(message, "id", None) or uuid.uuid4().hex
            timestamp = metadata.get("timestamp") or getattr(message, "timestamp", None) or now_utc_iso()

            # Get content - ChatMessageContent often has 'content' attribute
            content = getattr(message, "content", None)
            if content is None:
                # fall back to items representation if present
                items = getattr(message, "items", None)
                if items and len(items) > 0:
                    content = str(items[0])
                else:
                    content = ""

            out_msgs.append({
                "id": msg_id,
                "content": content,
                "role": role_val,
                "timestamp": timestamp,
            })

    return {"messages": out_msgs}

