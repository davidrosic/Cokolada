const PublicationModel = require('../models/Publication');

class PublicationController {
    async getPublications(params) {
        try {
            const category = params.category;
            const number = params.number;
            let order = params.order;

            if ( order === "desc" ) { order = -1 }
            else { order = 1 }

            if (number === "undefined") {
                return await PublicationModel.find({ "category": category }).sort({ "date": order });
            } else {
                const temp = await PublicationModel.find({ "category": category }).sort({ "date": order }).limit(number);
                console.log(temp)
                return temp;
            }
        } catch (error) {
            console.log("lib::controllers::postController.js::getPublications\n",error);
        }
    };

    async createPublication(params) {
        try {
            const date = new Date().toISOString();
            params.date = date;
            await PublicationModel.create(params);
        } catch (error) {
            console.log("lib::controllers::postController.js::createPublication\n",error);
            throw new Error("createPublication error", { cause: error });
        }
    }

    async addComment(params) {
        try {
            console.log(params.comment);
            if (params.comment === "" || params.comment === undefined) {
                throw new Error("Comment cannot be empty!");
            }

            return await PublicationModel.findOneAndUpdate(
                { "_id": params._id },
                { $push: { "comments": { username: params.username, comment: params.comment } } },
                { safe: true, upsert: true, new: true }
            );
        } catch (error) {
            console.log("lib::controllers::postController.js::addComment\n", error);
            throw new Error("addComment error");
        }
    }
}

const publicationController = new PublicationController();
module.exports = publicationController;