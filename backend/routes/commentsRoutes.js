const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

router.route('/').get(getComments).post(protect, createComment);
router.route('/:id').get(getCommentById).put(protect, updateComment).delete(protect, deleteComment);

module.exports = router;