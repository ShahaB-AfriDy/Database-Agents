# graph_app.py
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langgraph.graph import StateGraph
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.graph.message import add_messages
from typing import Annotated, Sequence
from pydantic import BaseModel
from langchain import hub
from langchain.utilities import SQLDatabase
from langchain.agents.agent_toolkits import SQLDatabaseToolkit

from langgraph.checkpoint.memory import InMemorySaver
from LLM_Module import LLM

class AgentState(BaseModel):
    messages: Annotated[Sequence[BaseMessage], add_messages]

llm = LLM()

def DB_Tools(db_file_path):
    db = SQLDatabase.from_uri(rF"sqlite:///{db_file_path}")
    toolkit = SQLDatabaseToolkit(db=db, llm=llm)
    return toolkit.get_tools()

def build_app(db_path):
    db_tools = DB_Tools(db_path)
    llm_with_tools = llm.bind_tools(db_tools)

    prompt_template = hub.pull("langchain-ai/sql-agent-system-prompt")
    system_message = prompt_template.format(dialect="SQLite", top_k=5)

    def agent_node(state: AgentState) -> AgentState:
        system_prompt = SystemMessage(content=system_message)
        messages = [system_prompt] + list(state.messages)
        response = llm_with_tools.invoke(messages)
        state.messages = messages + [response]
        return state

    graph = StateGraph(AgentState)
    graph.add_node("db_agent", action=agent_node)
    graph.add_node("tools", action=ToolNode(tools=db_tools))
    graph.set_entry_point("db_agent")
    graph.add_conditional_edges("db_agent", tools_condition)
    graph.add_edge("tools", "db_agent")
    graph.set_finish_point("db_agent")

    return graph.compile(checkpointer= InMemorySaver())




