# **PDF Chatbot**

A chatbot that allows users to ask questions about PDF documents and get
relevant responses. It uses Pinecone for storing vector embeddings and
OpenAI for generating answers.

## **Features**

-   Extracts text from PDF documents

-   Creates text embeddings using OpenAI

-   Stores embeddings in Pinecone\'s vector database

-   Searches for relevant context based on user questions

-   Generates responses using OpenAI\'s language models

-   Collects user feedback to improve the model

## **Setup and Installation**

### **Prerequisites**

-   Node.js and npm

-   Python 3.12

-   Virtual environment tool (e.g., venv)

### **Installation**

**Clone the repository\
**\
git clone https://github.com/adhyayan-ai/pdf-chatbot.git

cd pdf-chatbot

**Backend Setup\
**\
cd server

python3.12 -m venv venv

source venv/bin/activate \# On Windows, use \`venv\\Scripts\\activate\`

pip install -r requirements.txt

**Frontend Setup\
**\
cd client

npm install

### **Environment Variables**

Create a .env file in the server directory and add your Pinecone and
OpenAI API keys:

PINECONE_API_KEY=your-pinecone-api-key

OPENAI_API_KEY=your-openai-api-key

### **Running the Application**

**Start the backend server\
**\
cd server

source venv/bin/activate \# On Windows, use \`venv\\Scripts\\activate\`

uvicorn main:app \--reload

**Start the frontend development server\
**\
cd client

npm run dev

Open your browser and navigate to http://localhost:3000.

## **Usage**

1.  Enter your question in the input box.

2.  Submit the question to get a response from the chatbot.

3.  Provide feedback on the response using the feedback form that
    appears after the response is generated.

## **Challenges Encountered**

1.  **PDF Parsing**: Extracting clean text from PDF documents was tough
    because of different formats.

2.  **Embedding Generation**: Creating accurate embeddings was tricky
    and needed fine-tuning NLP models.

3.  **Query Response Generation**: Making sure the chatbot gave relevant
    answers needed a lot of testing.

4.  **Feedback Integration**: Collecting and using feedback effectively
    to improve the model was ongoing work.

## **Key Learnings**

1.  **NLP Techniques**: Learned more about text extraction, embedding
    generation, and similarity search.

2.  **Frontend-Backend Integration**: Improved skills in connecting
    frontend and backend for a smooth user experience.

3.  **User Feedback**: Understood the importance of user feedback in
    improving the model.

4.  **Performance Optimization**: Optimized performance by using
    efficient data structures and algorithms for embedding storage and
    search.

## **Contributing**

We welcome contributions from the community. To contribute, please
follow these steps:

1.  Fork the repository.

2.  Create a new branch for your feature or bugfix.

3.  Make your changes and commit them with clear messages.

4.  Push your changes to your forked repository.

5.  Submit a pull request to the main repository.
