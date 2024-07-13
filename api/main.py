from fastapi import FastAPI, HTTPException
from ai_model.pdf_parser import parse_pdf
from ai_model.embedder import get_embeddings
from ai_model.vector_db import VectorDatabase
import os

app = FastAPI()

db = VectorDatabase()

@app.post("/add_pdf")
async def add_pdf(file_path: str):
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"The file '{file_path}' does not exist.")
    
    pdf_text = parse_pdf(file_path)
    sentences, embeddings = get_embeddings(pdf_text)
    db.add_embeddings(embeddings, sentences)
    return {"message": "PDF content added successfully"}

@app.post("/query")
async def query_pdf(query: str):
    query_embedding = get_embeddings(query)[1][0]
    relevant_texts = db.search(query_embedding)
    if not relevant_texts:
        raise HTTPException(status_code=404, detail="No relevant text found")
    return {"relevant_texts": relevant_texts}