const PostModel = require('../models/Post');

class PostController {
    async getPosts() {
        try {
            return await PostModel.find();
        } catch (error) {
            console.log("lib::controllers::postController.js::getPosts\n",error);
        }
    };

    async createPost() {
        try {
            await PostModel.create({"title": "Naziv", "date": "2001-07-10", "text": "Ovo je tekst!"});
            return 0;
        } catch (error) {
            console.log("lib::controllers::postController.js::createPost\n",error);
        }
    }

    async createComment() {
        try {
            return await PostModel.findOneAndUpdate(
                { "_id": "656161d557aacfefe86d15e7" },
                { $push: { "comments": { username: "hardccode", comment: "komentar" } } },
                { safe: true, upsert: true, new: true }
            );
        } catch (error) {
            console.log("lib::controllers::postController.js::createComment\n",error);
        }
    }
}

const postController = new PostController();
module.exports = postController;