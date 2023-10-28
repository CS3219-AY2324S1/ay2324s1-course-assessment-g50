const express = require('express')
const { runCode, returnResult } = require('../controller/sandboxController')
const router = express.Router()

// Post code solution
router.post('/', (req, res) => {
    runCode(req, res)
})

module.exports = router