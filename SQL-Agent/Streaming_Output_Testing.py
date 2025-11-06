from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langgraph.graph import StateGraph
from langgraph.graph.message import add_messages
from pydantic import BaseModel
from typing import Annotated,Sequence
from LLM_Module import LLM

class AgentState(BaseModel):
    messages: Annotated[Sequence[BaseMessage], add_messages]

llm = LLM()


def agent_node(state: AgentState) -> AgentState:
    state.messages = llm.invoke(state.messages[-1:])
    return state

graph = StateGraph(AgentState)
graph.add_node("agent_node", action=agent_node)

graph.set_entry_point(key="agent_node")
graph.add_edge(start_key="agent_node",end_key="__end__")
graph.set_finish_point(key="agent_node")

app = graph.compile()


for message,metadata in app.stream(  
    {"messages":[HumanMessage(content="write a short story about the lights 250 words")]},
    stream_mode="messages",  
):
    print(message.content,end=" ",flush=True)