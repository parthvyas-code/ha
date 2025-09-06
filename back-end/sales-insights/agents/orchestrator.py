import json
import logging
from semantic_kernel.agents import ChatCompletionAgent
from semantic_kernel.contents.chat_history import ChatHistory
# from agents.planner import PlannerAgent
from plugins.PlannerPlugin import PlannerPlugin
from plugins.InsightPlugin import InsightsPlugin
from prompts.orchestrator_prompt import Orchestrator_prompt

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("orchestrator_agent")


class OrchestratorAgent:
    """
    High-level orchestrator agent:
    - Calls plugins via kernel (prompt-driven)
    - No manual agent calls inside run()
    """

    def __init__(self, kernel):
        self.kernel = kernel

        self.kernel.add_plugin(PlannerPlugin(kernel), "planner")
        self.kernel.add_plugin(InsightsPlugin(kernel), "insights")

    async def run(self, session_id: str, user_query: str, chat_history: ChatHistory) -> dict:
        logger.info(f"[session {session_id}] Orchestrator starting for query: {user_query}")

        orchestrator = ChatCompletionAgent(
            kernel=self.kernel,
            name="orchestrator_router",
            instructions= Orchestrator_prompt
        )

        # Instead of manual calls, delegate to router prompt
        message = f"""
        USER_QUERY: {user_query}
        HISTORY: {chat_history}
        """

        final_response = ""
        try:
            async for resp in orchestrator.invoke(message):
                if resp.content:
                    final_response = resp.content
                    logger.info(f"[session {session_id}] Orchestrator final response: {final_response}")
        except Exception as e:
            logger.error(f"Orchestrator router failed: {e}", exc_info=True)
            return {"reply": "Something went wrong while processing your request."}
        
        return {"reply": str(final_response).strip()}