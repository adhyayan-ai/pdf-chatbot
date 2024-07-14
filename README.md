# PDF Query Chatbot

## Table of Contents

- [Introduction](#introduction)
- [Methodology](#methodology)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Challenges Encountered](#challenges-encountered)
- [Key Learnings](#key-learnings)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The PDF Query Chatbot is a powerful application that allows users to query PDF documents using natural language. It leverages advanced natural language processing (NLP) and machine learning techniques to understand user queries and extract relevant information from PDFs. This project combines a user-friendly frontend interface with a robust backend to provide accurate and helpful responses.

## Methodology

### 1. PDF Parsing
- Extract text content from PDF documents.
- Convert the extracted text into a structured format for further processing.

### 2. Embedding Generation
- Generate embeddings for the extracted text using state-of-the-art NLP models.
- Store these embeddings for efficient similarity search.

### 3. Query Processing
- Receive user queries and generate embeddings for the queries.
- Perform similarity search against the stored embeddings to find relevant text passages.
- Generate responses based on the most relevant text passages.

### 4. Feedback Collection
- Collect user feedback on the quality of responses.
- Use the feedback to continuously improve the model.

## Technology Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend
- **Python**: The main programming language for backend logic.
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
- **PyMuPDF**: A library for parsing PDF documents.
- **Pinecone**: A vector database for storing and searching embeddings.
- **OpenAI**: For generating responses using GPT models.

## Setup and Installation

### Prerequisites

- Node.js and npm
- Python 3.12
- Virtual environment tool (e.g., venv)

### Installation

1. **Clone the repository**

```
git clone https://github.com/adhyayan-ai/pdf-chatbot.git
cd pdf-chatbot
```
