const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator') // params validation
const JsonResponse = require('../common/jsonResponse')
const { addUser, login, logout, getUserById, getUsers, updateUserInfo, updateUser, deleteUserById, updateUserAvatar } = require('../controller/userController')
const { isLoggedInCheck } = require('../middlewares/AuthorisationCheck');


// Register a new user:
router.post('/', [
    check('email').isEmail().withMessage("Email must be in valid format."),
    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return JsonResponse.fail(400, errors.array()[0].msg).send(res)
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
router.get('/', isLoggedInCheck, (req, res) => {
    getUserById(req, res)
})

// Get User infos by filter
router.get('/', isLoggedInCheck, (req, res) => {
    getUsers(req, res)
})

// Update current user Info:
router.patch('/info', [
    check('gender').optional().isIn(['male', 'female', 'unknown']).withMessage('Gender must be one of: male, female, unknown'),
    check('birth').optional().isDate().withMessage('Birthday must be a valid date')
], isLoggedInCheck, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return JsonResponse.fail(400, errors.array()[0].msg).send(res)
    }
    updateUserInfo(req, res)
})

router.patch('/', [
    check('email').optional().isEmail().withMessage("Email must be in valid format."),
    check('password')
        .optional()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.')
], isLoggedInCheck, (req, res) => {
    // Check params:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return JsonResponse.fail(400, errors.array()[0].msg).send(res)
    }
    updateUser(req, res)
})

// Deregister current user:
router.delete('/', isLoggedInCheck, (req, res) => {
    deleteUserById(req, res)
})

// Update current user's avator
const multer = require('multer')
const storage = multer.memoryStorage(); // Use in memory storage system
const imgUpload = multer({ storage }).single('avatar');
router.post('/info/avatar', imgUpload, isLoggedInCheck, (req, res) => {
    updateUserAvatar(req, res)
})

module.exports = router