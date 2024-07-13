import numpy as np
from pinecone import Pinecone, PodSpec
from sklearn.metrics.pairwise import cosine_similarity

class VectorDatabase:
    def __init__(self, api_key, index_name="pdf-index"):
        self.pinecone = Pinecone(api_key=api_key)
        if index_name not in self.pinecone.list_indexes().names():
            self.pinecone.create_index(
                name=index_name,
                dimension=384,  # Make sure this matches your embedding dimension
                metric='cosine',
                spec=PodSpec(
                    environment='gcp-starter'  # Free plan environment
                )
            )
        self.index = self.pinecone.Index(index_name)

    def add_embeddings(self, embeddings, sentences, batch_size=100):
        vectors = [{"id": str(i), "values": emb.tolist(), "metadata": {"text": sentences[i]}} for i, emb in enumerate(embeddings)]
        
        # Upsert embeddings in batches
        for i in range(0, len(vectors), batch_size):
            batch = vectors[i:i + batch_size]
            self.index.upsert(vectors=batch)

    def search(self, embedding, top_k=5):
        embedding_list = embedding.tolist()  # Convert ndarray to list
        result = self.index.query(vector=embedding_list, top_k=top_k, include_metadata=True)
        return [match["metadata"]["text"] for match in result["matches"]]

    def close(self):
        self.index.delete(delete_all=True)
        self.pinecone.delete_index(self.index_name)
        self.pinecone.deinit()