module.exports = (req, res) => {
  if (req.method === 'POST') {
    const { inputData } = req.body;

    if (!inputData) {
      return res.status(400).json({ error: 'No input data provided' });
    }

    // Here you can add your AI logic, for now, it just sends back the input
    return res.status(200).json({ message: 'AI task completed', data: inputData });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};
