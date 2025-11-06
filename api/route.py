# api.py
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import uuid
from typing import List, Optional

from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from graph_app import build_app   # your graph builder
from pydantic import BaseModel


# -----------------------------
#  FastAPI Setup
# -----------------------------
app = FastAPI(title="DB Chat Assistant API")

# Allow frontend (Streamlit, React etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
#  Thread memory store (RAM only)
# -----------------------------
THREADS = {}   # thread_id → { "graph": app, "history": [] }


# -----------------------------
#  Request / Response Schemas
# -----------------------------
class ChatRequest(BaseModel):
    thread_id: Optional[str] = None
    message: str


class ChatResponse(BaseModel):
    thread_id: str
    reply: str


# -----------------------------
#  Upload DB File (Initialize Thread)
# -----------------------------
@app.post("/upload-db")
async def upload_db(file: UploadFile = File(...)):
    # Create temp DB file
    temp_db = tempfile.NamedTemporaryFile(delete=False, suffix=".db")
    temp_db.write(await file.read())
    temp_db.flush()

    # Build graph agent
    graph = build_app(temp_db.name)

    # Create unique thread
    thread_id = str(uuid.uuid4())

    # Store thread in RAM
    THREADS[thread_id] = {
        "graph": graph,
        "history": []
    }

    return {"thread_id": thread_id, "message": "Database loaded successfully"}


# -----------------------------
#  Chat Endpoint
# -----------------------------
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):

    if request.thread_id not in THREADS:
        return {"thread_id": None, "reply": "Invalid thread_id. Upload a DB first."}

    session = THREADS[request.thread_id]
    graph = session["graph"]

    # add user message to memory
    session["history"].append({"role": "user", "content": request.message})

    # Convert history to LangChain messages
    history_messages = []
    for msg in session["history"]:
        if msg["role"] == "user":
            history_messages.append(HumanMessage(content=msg["content"]))
        else:
            history_messages.append(AIMessage(content=msg["content"]))

    # Run LangGraph
    response = graph.invoke(
        {"messages": history_messages},
        config={"thread_id": request.thread_id}
    )

    ai_reply = response["messages"][-1].content

    # Save AI message
    session["history"].append({"role": "assistant", "content": ai_reply})

    return ChatResponse(thread_id=request.thread_id, reply=ai_reply)


# -----------------------------
#  Run Server
# -----------------------------
if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
