##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Altudo-Dev/AI-Hackthon-2025.git
cd your-repo/back-end/sales-insights
```

---

### 2. Create & Activate Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate the environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

---

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

>  Make sure you have `python-dotenv`, `fastapi`, `uvicorn`, `semantic-kernel`, and any required Azure packages in `requirements.txt`.

---

### 4. Create `.env` File for Environment Variables or rename `.env.example` and use

In the root of the `/back-end/sales-insights` folder, create a `.env` file with the following contents:

```env
# Azure OpenAI Credentials
AZURE_OPENAI_ENDPOINT="https://your-openai-endpoint.openai.azure.com/"
AZURE_OPENAI_API_KEY="your-openai-api-key"
AZURE_DEPLOYMENT_NAME="your-model-deployment-name"
AZURE_API_VERSION="2024-05-13"

# Optional: Database or other service credentials
user="**************"
password="**************"
host="**************"
port="**************"
database="**************"
```

> ⚠️ **Keep `.env` out of version control** — add it to `.gitignore`.

To load these in Python:
```python
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("AZURE_OPENAI_API_KEY")
```

---

### 5. Run the Application (Custom Port Support)

To run the FastAPI app locally (choose any available port, e.g., 8000):

```bash
uvicorn main:app --reload --port 8000
```
---

## 📦 API Endpoints

### `POST /chat`

Handle chat input and receive AI-generated insights.

**Request:**
```json
{
  "session_id": "user-123",
  "message": "Show me gross revenue"
}
```

**Response:**
```json
{
  "reply": "Sales for this month are $10,000 across 5 regions."
}
```

---

### `GET /chat/history?session_id=user-123`

Returns message history for a given session.

---

### `GET /health`

Health check endpoint.


