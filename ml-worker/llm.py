
# replace this with your LLM provider for example if using GPT then use GPT model with langchain
from langchain_google_genai import ChatGoogleGenerativeAI

model = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.7, verbose=True)