from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()

def LLM(model_name="gemini-2.5-flash"):
    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )


if __name__ == "__main__":
    llm = LLM()
    response = llm.invoke("Hi")
    print(response.content)

