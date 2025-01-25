const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the uploads/ folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix); // Ensure unique filenames
  },
});

const upload = multer({ storage });

// Endpoint to upload media
router.post('/upload', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  try {
    const filePaths = req.files.map((file) =>
      `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    );

    res.status(200).json({ message: 'Files uploaded successfully', filePaths });
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Endpoint to serve media
router.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

module.exports = router;
