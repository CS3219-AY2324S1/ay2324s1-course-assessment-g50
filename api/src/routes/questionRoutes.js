const express = require('express')
const { addQuestion, updateQuestion, deleteQuestion, getQuestions } = require('../controller/questionController')
const { isAdminCheck, isLoggedInCheck } = require('../middlewares/AuthorisationCheck');
const router = express.Router()

//middleware that verifies user is logged in
router.use(isLoggedInCheck);

// Create one question
router.post('/', isAdminCheck, (req, res) => {
    addQuestion(req, res)
})

// Get questions by filter
router.get('/', (req, res) => {
    getQuestions(req, res)
})

// Update one question
router.patch('/:id', isAdminCheck, (req, res) => {
    updateQuestion(req, res)
})

// Delete one question
router.delete('/:id', isAdminCheck, (req, res) => {
    deleteQuestion(req, res)
})

module.exports = router