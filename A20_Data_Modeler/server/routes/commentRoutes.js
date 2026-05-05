const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
router.get('/post/:postId', commentController.getPostComments);
router.delete('/:id', commentController.deleteComment);

module.exports = router;