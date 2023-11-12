const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
    {
        matchId: {
            type: String,
            unique: true,
            required: true
        },
        members: {
            type: Array,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);