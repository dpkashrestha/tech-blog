const router = require('express').Router();
const { Blog, Comment } = require('../../models');

// The `/api/blogs` endpoint

router.get('/', async (req, res) => {
  // find all blogs
  // be sure to include its associated comment
  try {
    const blogData = await Blog.findAll({
      include: [{model: Comment}],
    });

    res.json(categoryData);
  } catch (err) {
    console.error('Error fetching blog with associated comment:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find one blog by its `id` value
  // be sure to include its associated comments
  
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [{ model: Comment }],
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No Blog found with that id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
 
});

router.post('/', async (req, res) => {
  // create a new Blog
  try {
    const blogData = await Blog.create(req.body);
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a Blog by its `id` value
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogData[0]) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a blog by its `id` value
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;