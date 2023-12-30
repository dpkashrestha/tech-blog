const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    // create a new Comment
    try {
      const commentData = await Comment.create(req.body);
      res.status(200).json(commentData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

  module.exports = router;