// /api/process.js
export default function handler(req, res) {
  // CORS Headers - Allow any origin (change '*' to a specific URL if needed)
  res.setHeader('Access-Control-Allow-Origin', '*');  // You can replace '*' with a specific domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Allow GET, POST, OPTIONS methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow content-type header

  // Handle OPTIONS request (for preflight CORS request)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();  // If it's an OPTIONS request, respond with 200 status
  }

  // Handle POST request (main API logic)
  if (req.method === 'POST') {
    const { inputData } = req.body;  // Extract inputData from the body

    // Process the inputData (your AI processing logic would go here)
    res.status(200).json({
      message: 'AI task completed',
      data: inputData,
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });  // If method is not POST, respond with 405
  }
}
