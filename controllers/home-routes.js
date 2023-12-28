const router = require("express").Router();
const { Blog, Comment} = require("../models");

// GET all blogs for homepage
router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll();

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render("homepage", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all blogs for homepage
router.get("/dashboard", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      // order: ["title"],
      where: {
        // Only get books that have this boolean set to TRUE
        user_id: req.session.userId,
      },
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    // Send over the 'loggedIn' session variable to the 'homepage' template
    res.render("dashboard", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

 // GET one blog
router.get('/blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment
        },
      ],
    });

    const blog = dbBlogData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'blog' template
    res.render('blog-comment', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit-blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id);

    const blog = dbBlogData.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'blog' template
    res.render('edit-blog', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create-blog', async (req, res) => {
  try {
    // Send over the 'loggedIn' session variable to the 'blog' template
    res.render('create-blog', {loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

// Signup route
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'signup' template
  res.render("signup");
});

module.exports = router;
