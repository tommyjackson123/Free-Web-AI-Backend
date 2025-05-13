import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://free-web-ai-backend.vercel.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputData: input }),
      });

      const data = await response.json();
      setResult(data);  // Display result from the backend
    } catch (error) {
      setResult({ error: 'An error occurred' });
    }
  };

  return (
    <div>
      <h1>Task AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your task"
          required
        />
        <button type="submit">Submit</button>
      </form>

      {result && <div>{JSON.stringify(result)}</div>}
    </div>
  );
}

export default App;
