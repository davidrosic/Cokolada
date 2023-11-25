const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scraperSchema = new Schema({

    url: {
        type: String,
        required: true
    },
    linkName: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Scraper', scraperSchema);