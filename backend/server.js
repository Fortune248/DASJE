const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { handleUpload, handleQuestion } = require('./aiController');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: '../uploads/' });

app.post('/upload', upload.single('file'), handleUpload);
app.post('/ask', handleQuestion);

app.listen(PORT, () => console.log('Backend running on port', PORT));
