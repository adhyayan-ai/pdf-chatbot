import { useState } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const ChatInterface = () => {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [thankYouMessage, setThankYouMessage] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: query }]);
    setLoading(true);

    const res = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: data.response }]);
    setQuery('');
    setLoading(false);
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, feedback, createdAt: new Date() }),
    });

    setRating(0);
    setFeedback('');
    setShowFeedback(false);
    setThankYouMessage(true);
    setTimeout(() => setThankYouMessage(false), 3000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-gray-50 font-sans">
      <div className="h-96 overflow-y-scroll mb-4 p-4 border border-gray-200 rounded bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg max-w-3/4 ${
              message.sender === 'user' ? 'bg-gray-200 self-end' : 'bg-blue-200 self-start'
            }`}
          >
            <p className="text-base">{message.text}</p>
          </div>
        ))}
        {loading && <p className="text-center text-gray-500">Loading...</p>}
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">
          Ask
        </button>
      </form>
      {showFeedback && (
        <form onSubmit={handleFeedbackSubmit} className="mt-4">
          <div className="mb-2">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating:
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value={0}>Select Rating</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Feedback:
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600">
            Submit Feedback
          </button>
        </form>
      )}
      {thankYouMessage && <p className="text-center text-green-500 mt-4">Thank you for your feedback!</p>}
    </div>
  );
};

export default ChatInterface;