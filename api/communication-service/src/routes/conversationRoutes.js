const express = require('express')
const { addConversation, getConversation } = require('../controller/conversationController')
const router = express.Router()

// New Conversation
router.post("/", (req, res) => {
    addConversation(req, res)
})

// Get conversation of a user
router.get("/:matchId", (req, res) => {
    getConversation(req, res)
})

module.exports = router