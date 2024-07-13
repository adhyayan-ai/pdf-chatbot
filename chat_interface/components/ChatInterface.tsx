import { useState } from 'react';
import axios from 'axios';

const ChatInterface = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleQuerySubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/query', { query });
      setResponses([...responses, response.data.relevant_texts]);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>PDF Chat Interface</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleQuerySubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      <div>
        {responses.map((response, index) => (
          <div key={index}>
            <p>{response}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;