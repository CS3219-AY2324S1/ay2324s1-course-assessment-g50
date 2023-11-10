const mongoose = require('mongoose')

const codeSchema = new mongoose.Schema({
    javascript: String,
    python: String,
    java: String
})

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
    solutionCode: codeSchema,
    templateCode: codeSchema,
    testCases: [String]
}, {
    timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)