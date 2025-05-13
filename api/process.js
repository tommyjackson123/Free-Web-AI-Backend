// /api/process.js
export default function handler(req, res) {
  // Allow CORS from all domains (or you can specify your domain if needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request (for CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request
  if (req.method === 'POST') {
    const { inputData } = req.body;
    
    // Your AI task logic can go here
    res.status(200).json({
      message: 'AI task completed',
      data: inputData
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
