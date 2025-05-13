const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// POST route for handling requests
app.post('/', (req, res) => {
  const { inputData } = req.body;  // This will get the inputData sent from the frontend

  // Respond with a JSON message
  res.json({
    message: 'AI task completed',
    data: inputData
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

