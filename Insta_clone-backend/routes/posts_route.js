const express = require('express');
const authenticate = require('../middlewares/protectedRoutes');
const { createPost,viewPost,myPost,deletePost } = require('../controllers/posts_controllers');



const router = express.Router();


// create post API
router.post('/new', authenticate, createPost);

// get post API for viewing all posts
router.get('/all', authenticate, viewPost);

// get post API viewing only user's own posts
router.get('/mypost', authenticate, myPost);


// delete post API : {user's own post only, protected route}
router.delete('/deletepost/:postid', authenticate, deletePost);



module.exports = router;

