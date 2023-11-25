const express = require('express');
const router = express.Router();
const postController = require('./lib/controllers/postController');

router.get('/post', async (req, res) => {
    try{
        const posts = await postController.getPosts();
        res.json(posts);
    } catch (err) {
        console.log("router.js\n",err);
    }
});

router.post('/post', async (req, res) => {
    try{
        const posts = await postController.createPost();
        res.json(posts);
    } catch (err) {
        console.log("router.js\n",err);
    }
});

router.post('/post/comment', async (req, res) => {
    try{
        await postController.createComment();
        res.json(0);
    } catch (err) {
        console.log("router.js\n",err);
    }
});

module.exports = router;