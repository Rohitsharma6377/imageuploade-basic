const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlogs,
  getRelatedPosts
} = require('../controllers/blogController');

router.route('/').get(getBlogs).post(protect, admin, createBlog);
router.get('/search', searchBlogs);
router.route('/:id').get(getBlogById).put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);
router.get('/:id/related', getRelatedPosts);

module.exports = router;