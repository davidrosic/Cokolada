const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: {
        type: String,
        default: "Гост"
    },
    comment: {
        type: String,
        default: ""
    }
})

const publicationSchema = new Schema({
    category: {
        type: String,
        enum: ['razvoj','dizajn','resursi','magazin'],
        default: 'magazin'
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: "Власник"
    },
    date: {
        type: Date,
        required: true
    },
    displayDate: {
        type: String,
        required: true
    },
    comments: {
        type: [commentSchema],
        required: false
    }
});

module.exports = mongoose.model('Publication', publicationSchema);