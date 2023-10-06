const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator') // params validation
const JsonResponse = require('../common/jsonResponse')
const { addUser, login, logout, getUserById, getUsers, updateUserInfo, updateUser, deleteUserById } = require('../controller/userController')
const { isLoggedInCheck } = require('../middlewares/AuthorisationCheck');

// Register a new user:
router.post('/', [
    check('email').isEmail(),
],  (req, res) => {
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
router.get('/', isLoggedInCheck, (req, res) => {
    getUserById(req, res)
})

// Get User infos by filter
router.get('/', isLoggedInCheck, (req, res) => {
    getUsers(req, res)
})

// Update current user Info:
router.patch('/info',[
    check('gender').optional().isIn(['male', 'female', 'unknown']),
    check('birth').optional().isDate()
], isLoggedInCheck,(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return JsonResponse.fail(400, errors.array()).send(res)
    }
    updateUserInfo(req, res)
})

router.patch('/', [
    check('email').optional().isEmail()
], isLoggedInCheck,  (req, res) => {
    // Check params:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return JsonResponse.fail(400, errors.array()).send(res)
    }
    updateUser(req, res)
})

// Deregister current user:
router.delete('/', isLoggedInCheck, (req, res) => {
    deleteUserById(req, res)
})

module.exports = router