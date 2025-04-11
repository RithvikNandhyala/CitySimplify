# %% [markdown]
# # City Simplify
# I wrote the code for this RAG model following along with this tutorial by pixegami on Youtube:
# https://youtu.be/2TJxpyO3ei4?si=HUa42Kv2Zxxmx9sk 
# 
# The requirements are below:

# %%


# %% [markdown]
# Securely storing API keys

# %%
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY_CREDITS = {os.getenv("API_KEY"): 20}
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# %% [markdown]
# ## Setting Up API
# Here, I use fastAPI to generate a post to the server. I use an API key in order to control who can use the API, and how many times they can use it using a credit system the reduces with each call. 

# %%
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()

origins = [
    "https://citysimplify.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# def verify_api_key(x_api_key: str = Header(none)):
#     credits = API_KEY_CREDITS.get(x_api_key, 0)
#     if credits <= 0:
#         raise HTTPException(status_code=401, detail="Invalid API key or no credits")

# @app.post("/generate")
# def generate(prompt: str, x_api_key: str = Depends(verify_api_key)):
#     API_KEY_CREDITS[x_api_key] -= 1

app.mount("/", StaticFiles(directory="dist", html=True), name="static")


@app.post("/chatbot")
async def chatbot(request: Request):
    data = await request.json()
    query = rag_query(data.get("query"))
    response = {"message": f"Received query: {query}"}
    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

# %% [markdown]
# ## Loading Documents

# %%
from langchain_community.document_loaders import PyPDFDirectoryLoader

DATA_PATH = "./data"

def load_documents():
    document_loader = PyPDFDirectoryLoader(DATA_PATH)
    return document_loader.load()

# %% [markdown]
# ## Text Splitter
# The documents by themselves are too large, so we split them into smaller chunks to make them easier to use.
# We will aslo give each chunk a unique ID, which will make adding more chunks to our vector database easier, allowing us to add and remove information without having to create an entirely new database.

# %%
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document

def split_documents(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=80,
        length_function=len
    )
    return text_splitter.split_documents(documents)

documents = load_documents()
chunks = split_documents(documents)

# %%
def calculate_chunk_ids(chunks):
    last_page_id = None
    current_chunk_index = 0
    
    for chunk in chunks:
        source = chunk.metadata.get("source")
        page = chunk.metadata.get("page")
        current_page_id = f"{source}:{page}"
    
        if current_page_id == last_page_id:
            current_chunk_index += 1
        else:
            current_chunk_index = 0
    
        chunk_id = f"{current_page_id}:{current_chunk_index}"
        chunk.metadata["id"] = chunk_id
        last_page_id = current_page_id

    return chunks

# %% [markdown]
# ## Generating Embeddings
# Using Ollama embeddings, we now generate the embeddings the RAG model will use to create queries.
# The defined function will be used when we create the database itself and when we actually want to query the database.

# %%
from langchain_aws import BedrockEmbeddings
from langchain_ollama import OllamaEmbeddings

def get_embedding():
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    # embeddings = BedrockEmbeddings(credentials_profile_name="default", region_name="us-east-1")
    return embeddings

# %% [markdown]
# ## Creating the Database
# Using ChromaDB, we can now use the embedding function to create a vector database.

# %%
from langchain_chroma import Chroma

db = Chroma(
    persist_directory="chroma",
    embedding_function=get_embedding()
)

# Adding or updating documents
chunks_with_ids = calculate_chunk_ids(chunks)

existing_items = db.get(include=[])
existing_ids = set(existing_items["ids"])
print(f"Number of existing docs in DB:{len(existing_ids)}")

# Only adding chunks that are not in the database

new_chunks = []
for chunk in chunks_with_ids:
    if chunk.metadata["id"] not in existing_ids:
        new_chunks.append(chunk)

if len(new_chunks):
    print(f"Adding new documents: {len(new_chunks)}")
    new_chunk_ids = [chunk.metadata["id"] for chunk in new_chunks]
    db.add_documents(new_chunks, ids=new_chunk_ids)
    db.persist()
else:
    print("No new documents to add")


# %% [markdown]
# ## Setting up the model and Query
# Using Ollama, we can locally call a model the answer questions based on a prompt, context, and question. While this won't be quite how the finished product will work, it is a good way to test outputs with the example data.

# %%
from langchain.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
"""

def rag_query(query_text: str):
    db = Chroma(
    persist_directory="chroma",
    embedding_function=get_embedding()
    )

    results = db.similarity_search_with_score(query_text, k=5)
    
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    # print(prompt)

    model = OllamaLLM(model="llama3.2")
    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text
