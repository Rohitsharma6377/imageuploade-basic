const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user', 'name');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('user', 'name');
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { content, blogId } = req.body;
    const comment = new Comment({
      content,
      user: req.user._id,
      blog: blogId
    });
    const createdComment = await comment.save();
    
    // Add comment to the blog's comments array
    await Blog.findByIdAndUpdate(blogId, { $push: { comments: createdComment._id } });

    res.status(201).json(createdComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// exports.updateComment = async (req, res) => {
//   try {
//     const { content } = req.body;
//     const comment = await Comment.findById(req.params.id);
//     if (comment) {
//       if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
//         return res.status(403).json({ message: 'Not authorized to update this comment' });
//       }
//       comment.content = content;
//       const updatedComment = await comment.save();
//       res.json(updatedComment);
//     } else {
//       res.status(404).json({ message: 'Comment not found' });
//     }
//   } catch (error) {
//     res.status(400).json({ 