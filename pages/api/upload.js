import { NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ error: `Failed to upload file: ${err.message}` });
        return reject(err);
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      res.status(200).json({ url: fileUrl });
      resolve();
    });
  });
}
