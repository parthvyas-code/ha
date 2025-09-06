import json
import logging
from semantic_kernel.agents import ChatCompletionAgent
from semantic_kernel.functions.kernel_function_decorator import kernel_function 
from prompts.Insights_prompt import Insights_prompt

class InsightsPlugin:
    def __init__(self, kernel):
        self.agent = ChatCompletionAgent(
            kernel=kernel,
            name="insights_agent",
            instructions=Insights_prompt
        )

    @kernel_function(
        name="insights_plugin",
        description="Executes planning: schema inspection, SQL generation, execution."
    )
    async def run(self, clarified_query: str, rows: dict) -> str:
        message = f"""
        Here's the context you need:
        USER_QUERY: {clarified_query}
        ROWS: {json.dumps(rows.get('rows', []))}
        """
        final_response = ""
        async for resp in self.agent.invoke(message):
            if resp.content:
                final_response = resp.content
        return str(final_response).strip()