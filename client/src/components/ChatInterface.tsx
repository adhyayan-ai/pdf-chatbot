// components/ChatInterface.tsx
import { useState } from 'react';

const ChatInterface = () => {
    const [query, setQuery] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

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
        setResponse(data.response.join('\n\n'));
        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your query..."
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Ask
                </button>
            </form>
            {loading ? <p>Loading...</p> : <p>{response}</p>}
        </div>
    );
};

export default ChatInterface;