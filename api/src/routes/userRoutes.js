const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator') // params validation
const JsonResponse = require('../common/jsonResponse')
const { addUser, login, getUserById, getUsers, updateUserInfo, updateUser, deleteUserById } = require('../controller/userController')

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

// Get current user info:
router.get('/', (req, res) => {
    getUserById(req, res)
})

// Get User infos by filter
router.get('/', (req, res) => {
    getUsers(req, res)
})

// Update current user Info:
router.patch('/info', [
    check('gender').isIn(['male', 'female', 'unknown']),
    check('birth').isDate(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return JsonResponse.fail(400, errors.array()).send(res)
    }
    updateUserInfo(req, res)
})

// Update current user email or password:
router.patch('/', [
    check('email').isEmail(),
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

module.exports = router