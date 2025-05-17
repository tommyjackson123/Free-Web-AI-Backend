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

  try {
    const hfResponse = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: inputData }),
    });

    if (!hfResponse.ok) {
      const error = await hfResponse.text();
      return res.status(500).json({ error: 'Hugging Face API error', details: error });
    }

    const result = await hfResponse.json();
    res.status(200).json({ message: 'AI Task Completed ✅', result });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
}
