export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { inputData } = req.body;

  if (!inputData) {
    return res.status(400).json({ error: 'Missing inputData' });
  }

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/gpt2',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: inputData }),
      }
    );

    const data = await response.json();

    res.status(200).json({ message: 'AI task completed', result: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process request', detail: error.message });
  }
}
