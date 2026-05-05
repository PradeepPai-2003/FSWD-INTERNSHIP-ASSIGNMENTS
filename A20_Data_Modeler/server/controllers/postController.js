const Post = require('../models/Post');
const User = require('../models/User');

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, content, description, author, category, tags, image } = req.body;

    const userExists = await User.findById(author);
    if (!userExists) return res.status(404).json({ message: 'User not found' });

    const post = new Post({
      title,
      content,
      description,
      author,
      category,
      tags,
      image
    });

    await post.save();
    await post.populate('author', 'username email profileImage');

    res.status(201).json({ 
      message: 'Post created successfully', 
      post 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email profileImage')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'username email profileImage bio');

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('author', 'username');

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post updated', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get posts by author
exports.getPostsByAuthor = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.authorId })
      .populate('author', 'username email profileImage')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search posts
exports.searchPosts = async (req, res) => {
  try {
    const { query } = req.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }).populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};