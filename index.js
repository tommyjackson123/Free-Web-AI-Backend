const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and handle CORS
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Main POST route
app.post('/api/process', (req, res) => {
  const { inputData } = req.body;

  res.json({
    message: 'AI task completed',
    data: inputData
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
