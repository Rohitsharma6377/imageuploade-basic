const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Blog.countDocuments();
    const blogs = await Blog.find()
      .populate('author', 'name')
      .populate('category', 'name')
      .populate('tags', 'name')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    res.json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlogs: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name')
      .populate('category', 'name')
      .populate('tags', 'name')
      .populate('comments');
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const blog = new Blog({
      title,
      content,
      author: req.user._id,
      category,
      tags
    });
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      blog.title = title;
      blog.content = content;
      blog.category = category;
      blog.tags = tags;
      blog.updatedAt = Date.now();
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.remove();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;
    const blogs = await Blog.find({ $text: { $search: query } })
      .populate('author', 'name')
      .populate('category', 'name')
      .populate('tags', 'name')
      .sort({ score: { $meta: 'textScore' } });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRelatedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const relatedPosts = await Blog.find({
      _id: { $ne: id },
      $or: [
        { category: blog.category },
        { tags: { $in: blog.tags } }
      ]
    })
    .limit(3)
    .populate('author', 'name')
    .populate('category', 'name')
    .populate('tags', 'name');

    res.json(relatedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};