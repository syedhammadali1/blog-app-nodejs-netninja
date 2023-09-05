const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const adminLayout = '../views/layouts/adminLayout';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();

  } catch (error) {

  }
}

/**
 * GET /
 * Admin - Login Page
 */
router.get('/admin', async (req, res) => { //handle http request
  // res.send('hello worldd');
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
    // res.send('admin');
    res.render('admin/index', {
      locals,
      currentRoute: '/admin',
      layout: adminLayout
    });
  } catch (error) {
    console.log(error);
  }

})


/**
 * POST /
 * Admin - Login Page
 */
router.post('/admin', async (req, res) => { //handle http request
  // res.send('hello worldd');
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
    console.log(req.body);
    res.redirect('/admin');
    res.render('admin/index', {
      locals,
      currentRoute: '/admin',
      layout: adminLayout
    });
  } catch (error) {
    console.log(error);
  }

})


/**
 * POST /
 * Admin - Register 
 */
router.post('/register', async (req, res) => { //handle http request

  const {
    username,
    password
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, 'hashedPassword');
  try {
    const user = await User.create({
      username,
      password: hashedPassword
    });
    res.status(200).json({
      message: 'User Created Successfully',
      user
    })
  } catch (error) {
    console.log(error);
  }

})

/**
 * POST /
 * Admin - login 
 */

router.post('/login', async (req, res) => { //handle http request
  try {
    const {
      username,
      password
    } = req.body;
    const user = await User.findOne({
      username: username
    });
    if (!user) {
      res.json({
        message: 'invalid credentials'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    // console.log(isValidPassword,'user 123');
    if (!isValidPassword) {
      res.json({
        message: 'invalid credentials'
      });
    }

    const token = jwt.sign({
      userId: user._id
    }, jwtSecret);
    res.cookie('token', token, {
      httpOnly: true
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }

})




// dashboard

router.get('/dashboard', authMiddleware, async (req, res) => {
  const posts = await Post.find();

  res.render('admin/dashboard', {
    data: posts,
    currentRoute: '/dashboard'
  });
})


// create post page

router.get('/add-post', authMiddleware, async (req, res) => {
  const posts = await Post.find();

  res.render('admin/post/add', {
    data: posts,
    currentRoute: '/add-post'
  });
})

// create post 

router.post('/add-post', async (req, res) => {
  const {
    title,
    body
  } = req.body;
  const newPost = await new Post({
    title,
    body
  })

  await Post.create(newPost);
  res.redirect('/dashboard');
  // res.render('admin/post/add', {
  //   data: posts,
  //   currentRoute: '/add-post'
  // });
})
module.exports = router;