const JsonResponse = require('../common/jsonResponse');
const TokenUtil = require('../utils/TokenUtil')
const skippedApis = [
    { url: '/users/login', method: 'POST' },
    { url: '/users', method: 'POST' },
]

function isSkipped(req) {
    return skippedApis.some(api => {
        // Check if URL is skipped
        return req.path === api.url && req.method === api.method;
    })
}

// Get current session's user id.
function getCurrentUserId(req) {
    const token = req.headers['token']
    const userId = TokenUtil.verifyToken(token)

    if (userId < 0) {
        throw new Error('Illigel User!')
    }
    return userId
}

// Verify token, inject id.
function checkJwtToken(req, res, next) {
    try {
        if (isSkipped(req)) {
            // Check if this request can be skipped.
            next()
        } else {
            // Check if token is valid
            const id = getCurrentUserId(req)
            req.query.id = id
            next()
        }
    } catch (error) {
        return JsonResponse.fail(500, error).send(res)
    }
}

module.exports = checkJwtToken