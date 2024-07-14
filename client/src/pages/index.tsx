import ChatInterface from '../components/ChatInterface';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">PDF Query Chatbot</h1>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Home;
