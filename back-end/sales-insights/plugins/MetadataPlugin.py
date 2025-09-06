# plugins/metadata_plugin.py
import os
import mysql.connector
from typing import Dict, Any, List
from dotenv import load_dotenv
from semantic_kernel.functions.kernel_function_decorator import kernel_function

# Load DB connection details from .env
load_dotenv()

def _mysql_kwargs() -> dict:
    """Helper to collect MySQL connection params from env variables."""
    return {
        "host": os.getenv("host"),
        "port": int(os.getenv("port")),
        "user": os.getenv("user"),
        "password": os.getenv("password"),
    }

class MetadataPlugin:
    """
    Plugin for retrieving MySQL table metadata (column names & types).
    Registered into Semantic Kernel, so LLM can call it programmatically.
    """

    @kernel_function(
        name="get_schema",
        description="Get schema details for a given database and table."
    )
    def get_schema(self, schema_name: str, table_name: str) -> Dict[str, Any]:
        """
        Returns schema: { database, table_name, columns:[{name, type}, ...] }
        """
        conn = mysql.connector.connect(**_mysql_kwargs(), database=schema_name)
        try:
            cur = conn.cursor()
            q = """
                SELECT COLUMN_NAME, DATA_TYPE
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s
                ORDER BY ORDINAL_POSITION
            """
            cur.execute(q, (schema_name, table_name))
            cols: List[Dict[str, Any]] = [
                {"name": c, "type": t} for (c, t) in cur.fetchall()
            ]
            cur.close()
        finally:
            conn.close()

        return {"database": schema_name, "table_name": table_name, "columns": cols}
