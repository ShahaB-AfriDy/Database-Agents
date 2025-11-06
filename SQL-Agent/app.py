import streamlit as st
import os
import uuid
import tempfile
from graph_builder import build_app
from langchain_core.messages import HumanMessage, AIMessage

# -----------------------------------
# Custom CSS → Narrow Chat Window
# -----------------------------------
st.set_page_config(page_title="DB Chat Assistant", page_icon="🗄️")

st.markdown(
    """
    <h1 style="text-align:center; margin-bottom:10px;">
        🗄️ Database Chat Assistant
    </h1>
    <p style="text-align:center; font-size:18px; color:gray; margin-top:-10px;">
        Chat with your database • Upload a .db file and start asking questions
    </p>
    """,
    unsafe_allow_html=True
)


# -----------------------------------
# Session Initialization
# -----------------------------------
if "message_history" not in st.session_state:
    st.session_state["message_history"] = []

if "db_path" not in st.session_state:
    st.session_state["db_path"] = None

if "thread_id" not in st.session_state:
    st.session_state["thread_id"] = None

if "last_uploaded_name" not in st.session_state:
    st.session_state["last_uploaded_name"] = None


# -----------------------------------
# Sidebar Upload
# -----------------------------------
st.sidebar.header("Upload Database")
uploaded_file = st.sidebar.file_uploader("Upload .db file", type=["db"])

if uploaded_file is not None:

    # If a new DB file → reset chat and thread
    if st.session_state["last_uploaded_name"] != uploaded_file.name:
        st.session_state["message_history"] = []
        st.session_state["thread_id"] = None
        st.session_state["db_path"] = None
        st.session_state["last_uploaded_name"] = uploaded_file.name

    # Create an in-memory temporary file
    temp_db = tempfile.NamedTemporaryFile(delete=False, suffix=".db")
    temp_db.write(uploaded_file.getbuffer())
    temp_db.flush()

    #  Use this temp path (NOT saved permanently)
    st.session_state.db_path = temp_db.name

    #  Create new thread if needed
    if st.session_state.thread_id is None:
        st.session_state.thread_id = str(uuid.uuid4())

    st.sidebar.success(f"DB Loaded: {uploaded_file.name}")

    #  Build graph using temporary in-memory DB
    app = build_app(st.session_state.db_path)



# -----------------------------------
# Require DB
# -----------------------------------
if st.session_state.db_path is None:
    st.warning("Please upload a .db file to start chatting.")
    st.stop()


# -----------------------------------
# Load Chat History
# -----------------------------------
for msg in st.session_state["message_history"]:
    avatar = "👤" if msg["role"] == "user" else "🤖"
    with st.chat_message(msg["role"], avatar=avatar):
        st.text(msg["content"])


# -----------------------------------
# Chat Input
# -----------------------------------
user_input = st.chat_input("Type your question...")

if user_input:

    # Save user message
    st.session_state["message_history"].append({"role": "user", "content": user_input})

    with st.chat_message("user", avatar="👤"):
        st.text(user_input)

    # Build memory list
    history_messages = [
        HumanMessage(content=m["content"]) if m["role"] == "user"
        else AIMessage(content=m["content"])
        for m in st.session_state["message_history"]
    ]

    # Run graph with full memory + thread ID
    response = app.invoke(
        {"messages": history_messages},
        config={"thread_id": st.session_state["thread_id"]}
    )

    ai_text = response["messages"][-1].content

    # Save AI message
    st.session_state["message_history"].append({
        "role": "assistant",
        "content": ai_text
    })

    with st.chat_message("assistant", avatar="🤖"):
        st.text(ai_text)
