const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Create comment
exports.createComment = async (req, res) => {
  try {
    const { content, author, post } = req.body;

    const postExists = await Post.findById(post);
    if (!postExists) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({ content, author, post });
    await comment.save();
    await comment.populate('author', 'username profileImage');

    res.status(201).json({ message: 'Comment created', comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a post
exports.getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username profileImage')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};