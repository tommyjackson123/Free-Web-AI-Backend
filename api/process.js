// /api/process.js

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { inputData } = req.body;

    try {
      // Detect task type
      if (inputData.toLowerCase().includes('video')) {
        return res.status(200).json({
          task: 'video',
          message: 'Simulated video generated.',
          url: 'https://example.com/fake-video.mp4',
        });
      }

      if (inputData.toLowerCase().includes('code')) {
        return res.status(200).json({
          task: 'code',
          message: 'Simulated code generated.',
          code: 'console.log("Hello, world!");',
        });
      }

      return res.status(200).json({
        task: 'text',
        message: 'Simulated text generated.',
        text: 'This is a placeholder text result.',
      });
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong.', details: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
