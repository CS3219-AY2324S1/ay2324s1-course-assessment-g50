// Control all the routes.

const express = require('express')
const { getPublicKey } = require('../utils/RSAUtil')
const JsonResponse = require('../common/jsonResponse')
const router = express.Router()

const questionRouter = require('./questionRoutes')
const userRouter = require('./userRoutes')

// Get Rsa public key:
router.get('/rsa-pks', (req, res) => {
    const key = getPublicKey()
    return JsonResponse.success(200, key).send(res)
})

router.use('/questions', questionRouter)
router.use('/users', userRouter)

module.exports = router