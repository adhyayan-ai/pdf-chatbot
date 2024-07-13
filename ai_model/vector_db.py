import pinecone
import numpy as np

class VectorDatabase:
    def __init__(self):
        pinecone.init(api_key="YOUR_PINECONE_API_KEY")
        self.index = pinecone.Index("pdf-embeddings")
        self.sentences = []

    def add_embeddings(self, embeddings, sentences):
        vectors = [{"id": str(i), "values": emb} for i, emb in enumerate(embeddings)]
        self.index.upsert(vectors)
        self.sentences.extend(sentences)

    def search(self, embedding, k=5):
        results = self.index.query(vector=embedding.tolist(), top_k=k)
        relevant_texts = [hit['metadata']['text'] for hit in results['matches']]
        return relevant_texts