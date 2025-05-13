// /api/process.js
export default function handler(req, res) {
  // Allow CORS from any origin (or specify the exact domain if you prefer)
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains (you can change '*' to your frontend URL)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request (for preflight check)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request
  if (req.method === 'POST') {
    const { inputData } = req.body;
    
    // Your AI task logic here
    res.status(200).json({
      message: 'AI task completed',
      data: inputData
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
