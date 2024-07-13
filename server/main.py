from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pdf_parser import parse_pdf
from embedder import get_embeddings
from vector_db import VectorDatabase
from chatbot import generate_response
import os
from dotenv import load_dotenv

app = FastAPI()

class Query(BaseModel):
    query: str

class Response(BaseModel):
    response: str

# Load environment variables from .env file
load_dotenv()

# Retrieve Pinecone API key from environment variables
api_key = os.getenv('PINECONE_API_KEY')

if api_key is None:
    raise ValueError("The PINECONE_API_KEY environment variable is not set.")

# Initialize and prepare the database with the parsed PDF
pdf_path = "../document.pdf"
pdf_text = parse_pdf(pdf_path)
paragraphs, paragraph_embeddings = get_embeddings(pdf_text)
vector_db = VectorDatabase(api_key=api_key)
vector_db.add_embeddings(paragraph_embeddings, paragraphs)

@app.post("/query", response_model=Response)
async def query_pdf(query: Query):
    query_text = query.query
    query_embedding = get_embeddings(query_text)[1]  # Only get the embedding
    relevant_paragraphs = vector_db.search(query_embedding)

    if not relevant_paragraphs:
        raise HTTPException(status_code=404, detail="No relevant context found")

    response = generate_response(query_text, query_embedding, paragraphs, paragraph_embeddings)
    return Response(response=response)
