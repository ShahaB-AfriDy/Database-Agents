import os
import asyncio
from datetime import datetime
import streamlit as st
from dotenv import load_dotenv
from langchain_core.messages import AIMessage
from streamlit.runtime.scriptrunner import add_script_run_ctx

# Import your existing research_graph and related setup
from backend.core.researcher import research_graph, message_history  # <-- assuming your above code is in main.py

# -----------------------------------------------------------
# ENV + PAGE SETUP
# -----------------------------------------------------------
load_dotenv()
st.set_page_config(
    page_title="ArXiv Research Assistant",
    layout="wide"
)

# -----------------------------------------------------------
# HEADER
# -----------------------------------------------------------
st.title("ArXiv Research Assistant")
st.caption("Powered by LangGraph, Gemini, Tavily, and PostgreSQL Memory")

# -----------------------------------------------------------
# SIDEBAR: HISTORY
# -----------------------------------------------------------
st.sidebar.header("Research Memory (from PostgreSQL)")
st.sidebar.info("These are past stored sessions.")

if message_history.messages:
    for m in message_history.messages[-10:]:
        role = "AI" if isinstance(m, AIMessage) else "User"
        st.sidebar.markdown(f"**{role}:** {m.content[:120]}...")
else:
    st.sidebar.write("No stored research memory yet.")

# -----------------------------------------------------------
# MAIN INPUT
# -----------------------------------------------------------
st.subheader("Enter your research topic")
user_query = st.text_input("Example: 'Quantum computing for cryptography'", key="user_query")

if st.button("Run Research"):
    if not user_query.strip():
        st.warning("Please enter a research topic.")
        st.stop()

    st.info(f"Running research on '{user_query}'... This may take a moment.")

    # Async wrapper for running LangGraph
    async def run_research():
        result = await research_graph.ainvoke({"messages": [], "query": user_query})
        return result

    # Run async in Streamlit
    loop = asyncio.new_event_loop()
    add_script_run_ctx(loop)
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(run_research())

    # Extract response
    ai_message = result["messages"][-1].content
    st.session_state["latest_result"] = ai_message

    st.success("Research complete! See below.")

# -----------------------------------------------------------
# DISPLAY RESULT
# -----------------------------------------------------------
if "latest_result" in st.session_state:
    st.markdown("## Research Summary")
    st.markdown(st.session_state["latest_result"])

    # Option to download report
    today = datetime.now().strftime("%Y-%m-%d")
    report_name = f"research_report_{today}.txt"
    st.download_button(
        label="Download Report",
        data=st.session_state["latest_result"],
        file_name=report_name,
        mime="text/plain"
    )

# -----------------------------------------------------------
# FOOTER
# -----------------------------------------------------------
st.markdown("---")
st.caption("Built with LangGraph • Gemini 2.5 Flash • Tavily Search • PostgreSQL Memory")
