import { useState } from 'react';

const Home = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setResponse(data.response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">PDF Query Chatbot</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query"
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-md shadow-inner">
            <h2 className="text-xl font-semibold mb-2">Response</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;