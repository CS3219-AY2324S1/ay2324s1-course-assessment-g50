const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);