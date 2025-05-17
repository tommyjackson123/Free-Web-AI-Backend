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
  if (!inputData) {
    return res.status(400).json({ error: 'Missing inputData' });
  }

  const task = inputData.toLowerCase();

  try {
    let result;

    if (task.includes('summarize') || task.includes('summary')) {
      result = await handleTextSummarization(task);
    } else if (task.includes('image') || task.includes('generate image') || task.includes('picture')) {
      result = await handleImageGeneration(task);
    } else {
      result = { message: "🤖 Sorry, I don't recognize this task (yet)." };
    }

    res.status(200).json({ message: "AI Task Completed ✅", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI Task Failed", details: err.message });
  }
}

// Hugging Face Helpers
async function handleTextSummarization(text) {
  const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HF_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: text })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error: ${errorText}`);
  }

  return await response.json();
}

async function handleImageGeneration(prompt) {
  const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HF_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: prompt })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error: ${errorText}`);
  }

  const imageBuffer = await response.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString('base64');
  return { image: `data:image/png;base64,${base64Image}` };
}
