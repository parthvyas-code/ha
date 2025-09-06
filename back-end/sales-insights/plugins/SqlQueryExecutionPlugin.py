# plugins/sql_plugin.py
import os
import mysql.connector
from typing import Dict, Any, List
from dotenv import load_dotenv
from semantic_kernel.functions.kernel_function_decorator import kernel_function


load_dotenv()

def _mysql_kwargs() -> dict:
    return {
        "host": os.getenv("host"),
        "port": int(os.getenv("port")),
        "user": os.getenv("user"),
        "password": os.getenv("password"),
        "database": os.getenv("database"),  # default db, optional
    }

class SqlPlugin:
    """Plugin to execute read-only SQL queries and return rows."""

    @kernel_function(
        name="execute_query",
        description="Execute a SELECT query and return rows as JSON objects."
    )
    def execute_query(self, sql: str) -> Dict[str, Any]:
        conn = mysql.connector.connect(**_mysql_kwargs())
        cur = None
        try:
            cur = conn.cursor()
            cur.execute(sql)

            if cur.description is None:
                rows: List[dict] = []
            else:
                cols = [c[0] for c in cur.description]
                rows = [dict(zip(cols, r)) for r in cur.fetchall()]

            return {"rows": rows}
        except mysql.connector.Error as e:
            return {"error": str(e)}
        finally:
            if cur:
                cur.close()
            conn.close()

