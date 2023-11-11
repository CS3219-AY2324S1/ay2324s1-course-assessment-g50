const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator') // params validation
const JsonResponse = require('../common/jsonResponse')
const { addUser, login, logout, getUserById, getUsers, updateUserInfo, updateUser, deleteUserById, 
    updateUserAvatar, getAttemptedQuestionsHistory, getAttemptedQuestionsHistoryPageCount, getAttemptedQuestionsDetails,
    updateAttemptedQuestionName } = require('../controller/userController')

// Register a new user:
router.post('/', [
    check('email').isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return JsonResponse.fail(400, errors.array()).send(res)
    }
    addUser(req, res)
})

// User login:
router.post('/login', (req, res) => {
    login(req, res)
})

// User logout:
router.post('/logout', (req, res) => {
    logout(req, res);
})

// Get current user info:
router.get('/', (req, res) => {
    getUserById(req, res)
})

// Get User infos by filter
router.post('/target', (req, res) => {
    getUsers(req, res)
})

// Update current user Info:
router.patch('/info', [
    check('gender').optional().isIn(['male', 'female', 'unknown']),
    check('birth').optional().isDate()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return JsonResponse.fail(400, errors.array()).send(res)
    }
    updateUserInfo(req, res)
})

router.patch('/', [
    check('email').optional().isEmail()
], (req, res) => {
    // Check params:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return JsonResponse.fail(400, errors.array()).send(res)
    }
    updateUser(req, res)
})

// Deregister current user:
router.delete('/', (req, res) => {
    deleteUserById(req, res)
})

// Update current user's avator
const multer = require('multer')
const storage = multer.memoryStorage(); // Use in memory storage system
const imgUpload = multer({ storage }).single('avatar');
router.post('/info/avatar', imgUpload, (req, res) => {
    updateUserAvatar(req, res)
})


// get user attempt history
router.get('/history/:page', (req, res) => {
    getAttemptedQuestionsHistory(req, res)
})

router.get('/history', (req, res) => {
    getAttemptedQuestionsHistoryPageCount(req, res);
})

router.get('/history/question/:questionName', (req, res) => {
    getAttemptedQuestionsDetails(req, res)
})

router.patch('/history/question/:questionName', (req, res) => {
    updateAttemptedQuestionName(req, res)
})


module.exports = router