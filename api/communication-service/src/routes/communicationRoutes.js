const express = require('express')
const { getMessages, addMessage } = require('../controller/communicationController')
const router = express.Router()

router.get('/', (req, res) => {
    getMessages(req, res);
})

router.post('/', (req, res) => {
    addMessage(req, res);
})

module.exports = router