const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    complexity: {
        type: String,
        required: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
    }
})

module.exports = mongoose.model('Question', questionSchema)