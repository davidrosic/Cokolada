const express = require('express');
const router = express.Router();
const postController = require('./lib/controllers/postController');
const reportController = require('./lib/controllers/reportController');

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

router.get('/report', async (req,res) => {
    try{
        const reports = await reportController.getReports();
        res.json(reports);
    } catch(err) {
        console.log("router.js\n",err);
    }
});

router.post('/report', async (req, res) => {
    try{
        console.log(req.body);
        const email = req.body.email;
        const text = req.body.text;
        await reportController.createReport({email,text});
        res.json(0);
    } catch(err) {
        console.log("router.js\n",err);
    }
});

module.exports = router;