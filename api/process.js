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

  // Detect the task type
  const isCodeRequest = /code|app|website|extension|script|function|build/i.test(inputData);

  try {
    const response = await fetch(
      isCodeRequest
        ? 'https://api-inference.huggingface.co/models/bigcode/starcoder'
        : 'https://api-inference.huggingface.co/models/bigscience/bloomz',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: inputData }),
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace error: ${response.statusText}`);
    }

    const result = await response.json();

    res.status(200).json({
      success: true,
      result: result[0]?.generated_text || 'No response from model.',
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
