const express = require('express');
const router = express.Router();
const multer = require('multer');
const { answerQuestion } = require('./aiController');

const upload = multer({ dest: '../uploads/' });

// Upload PDFs/videos
router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded', file: req.file });
});

// Ask AI question
router.get('/ask', async (req, res) => {
    const { question, table } = req.query;
    const answer = await answerQuestion(question, table || 'gsm8k');
    res.json({ answer });
});

module.exports = router;
