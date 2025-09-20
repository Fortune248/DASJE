const db = require('./db');
require('dotenv').config();
const fetch = require('node-fetch');

async function handleUpload(req, res) {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send({ message: 'File uploaded successfully', path: req.file.path });
}

async function handleQuestion(req, res) {
  const { question } = req.body;
  if (!question) return res.status(400).send('No question provided.');

  db.all("SELECT * FROM gsm8k UNION SELECT * FROM openmathinstruct1", [], async (err, rows) => {
    if (err) return res.status(500).send(err.message);

    const context = rows.map(r => r.content).join("\n").slice(0, 1000);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful tutor." },
            { role: "user", content: `Answer this question based on context:\n${context}\nQuestion: ${question}` },
          ],
        }),
      });

      const data = await response.json();
      res.json({ answer: data.choices[0].message.content });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
}

module.exports = { handleUpload, handleQuestion };
