// Control all the routes.

const express = require('express')
const router = express.Router()

const questionRouter = require('./questionRoutes')
const userRouter = require('./userRoutes')

router.use('/questions', questionRouter)
router.use('/users', userRouter)

module.exports = router