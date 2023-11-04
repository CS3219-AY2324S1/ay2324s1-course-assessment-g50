const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);