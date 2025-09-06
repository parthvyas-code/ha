import logging
import json
from plugins.MetadataPlugin import MetadataPlugin
from plugins.SqlQueryExecutionPlugin import SqlPlugin
from semantic_kernel.agents import ChatCompletionAgent
from semantic_kernel.functions.kernel_function_decorator import kernel_function
from prompts.planner_prompt import PLANNER_PROMPT


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("planner_agent")


class PlannerPlugin:
    """
    Middle-layer agent:
    - Registers plugins (Metadata + SQL execution)
    - Uses LLM (ChatCompletionAgent) to:
        → Inspect schema
        → Generate SQL if query is data-related
        → Execute query
    - Always returns consistent JSON:
      {
        "sql_query": "...",   # may be "" if not applicable
        "rows": [...],        # may be [] if not applicable
        "reply": "assistant-friendly response"
      }
    """

    def __init__(self, kernel):
        self.kernel = kernel

    @kernel_function(
        name="planner_plugin",
        description="Executes planning: schema inspection, SQL generation, execution."
    )
    async def run(self, user_question: str) -> dict:
        # Register plugins (safe even if already registered)
        self.kernel.add_plugin(MetadataPlugin(), "metadata")
        self.kernel.add_plugin(SqlPlugin(), "sql")

        # Initialize chat agent
        chat_agent = ChatCompletionAgent(
            kernel=self.kernel,
            name="sql_generation_and_execution_agent",
            instructions=PLANNER_PROMPT
        )

        message = f"USER_QUESTION: {user_question}"
        logger.info(f"Invoking planner agent with message: {message}")

        final_agent_response_content = ""

        try:
            async for agent_response in chat_agent.invoke(message):
                if agent_response.content:
                    final_agent_response_content = agent_response.content
        except Exception as e:
            logger.error(f"Error during agent invocation: {e}", exc_info=True)
            return {
                "sql_query": "",
                "rows": [],
            }

        response_text = str(final_agent_response_content).strip()

        try:
            parsed = json.loads(response_text)

            # Always normalize fields
            return {
                "sql_query": parsed.get("sql_query", ""),
                "rows": parsed.get("rows", []),
            }

        except json.JSONDecodeError:
            logger.warning(f"Planner output not valid JSON: {response_text}")
            return {
                "sql_query": "",
                "rows": []
            }
