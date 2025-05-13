import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('Processing...');

    try {
      const response = await fetch('https://free-web-ai-backend.vercel.app/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputData: input }),
      });

      const data = await response.json();

      if (data.task === 'video') {
        setResult(
          <>
            <p>{data.message}</p>
            <video src={data.url} controls width="400" />
          </>
        );
      } else if (data.task === 'code') {
        setResult(
          <>
            <p>{data.message}</p>
            <pre><code>{data.code}</code></pre>
          </>
        );
      } else {
        setResult(
          <>
            <p>{data.message}</p>
            <p>{data.text}</p>
          </>
        );
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1>Free Web AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your task..."
          required
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button type="submit">Submit</button>
      </form>
      <div style={{ marginTop: '20px' }}>{result}</div>
    </main>
  );
}
