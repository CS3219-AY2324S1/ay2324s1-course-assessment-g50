const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true,
    },
    complexity: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)