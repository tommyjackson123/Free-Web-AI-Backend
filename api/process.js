// /api/process.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { inputData } = req.body;
    
    // You can add your logic to process the data here (AI task logic)
    res.status(200).json({
      message: 'AI task completed',
      data: inputData
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
