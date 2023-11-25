const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Report',reportSchema);