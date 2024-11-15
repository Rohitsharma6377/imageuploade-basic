const express = require('express');
const multer = require('multer');
const Banner = require('../models/Banner');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/banner', async (req, res) => {
  const banner = await Banner.findOne();
  res.json(banner);
});

router.post('/banner', upload.single('image'), async (req, res) => {
  const { text } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  const banner = new Banner({ text, imageUrl });
  await banner.save();

  res.json(banner);
});

module.exports = router;
