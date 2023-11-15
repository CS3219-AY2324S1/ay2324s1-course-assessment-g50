const express = require('express');
const { getMessages, addMessage } = require('../controller/messageController')
const router = express.Router()

router.post("/", (req, res) => {
    addMessage(req, res)
})

router.get("/:conversationId", (req, res) => {
    getMessages(req, res)
})

module.exports = router
