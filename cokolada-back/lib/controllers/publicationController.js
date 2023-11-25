const PublicationModel = require('../models/Publication');
const moment = require('moment');

class PublicationController {
    async getPublications(params) {
        try {
            const category = params.category;
            const number = params.number;
            let order = params.order;
            let query;

            if ( category === "razvoj" || category === "dizajn" || category === "resursi" ) {
                query = { "category": category };
            } else {
                query = {};
            }

            if ( order === "desc" ) { order = -1 }
            else { order = 1 }

            if (number === "undefined") {
                return await PublicationModel.find(query).sort({ "date": order });
            } else {
                return await PublicationModel.find(query).sort({ "date": order }).limit(number);
            }
        } catch (error) {
            console.log("lib::controllers::postController.js::getPublications\n",error);
        }
    };

    async getPublicationById(params) {
        try {
            return await PublicationModel.find({ "_id": params.id });
        } catch (error) {
            console.log("lib::controllers::postController.js::getPublicationById\n",error);
        }
    };

    async createPublication(params) {
        try {
            moment.locale("sr-cyrl");
            const displayDate = moment().format('LLL');  // 26. новембар 2023. 0:14
            const date = new Date();
            params.displayDate = displayDate;
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