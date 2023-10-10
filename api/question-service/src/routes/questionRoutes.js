const express = require('express')
const { addQuestion, updateQuestion, deleteQuestion, getQuestions } = require('../controller/questionController')
const router = express.Router()

// Create one question
router.post('/', (req, res) => {
    addQuestion(req, res)
})

// Get questions by filter
router.get('/', (req, res) => {
    getQuestions(req, res)
})

// Update one question
router.patch('/:id', (req, res) => {
    updateQuestion(req, res)
})

// Delete one question
router.delete('/:id', (req, res) => {
    deleteQuestion(req, res)
})

module.exports = router