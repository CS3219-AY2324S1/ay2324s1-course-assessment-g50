const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator') // params validation
const JsonResponse = require('../common/jsonResponse')
const { addUser, login, getUserById, updateUserInfo, updateUser, deleteUserById } = require('../controller/userController')

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

// Get user info:
router.get('/:id', (req, res) => {
    getUserById(req, res)
})

// Update user Info:
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

// Update user:
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

// Deregister user:
router.delete('/', (req, res) => {
    deleteUserById(req, res)
})

module.exports = router