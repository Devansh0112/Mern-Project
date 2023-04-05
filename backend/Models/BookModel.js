const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publisher: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports.Book = mongoose.model('Cat', bookSchema);