const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
} = require('../controllers/tagController');

router.route('/').get(getTags).post(protect, admin, createTag);
router.route('/:id').get(getTagById).put(protect, admin, updateTag).delete(protect, admin, deleteTag);

module.exports = router;