const JsonResponse = require('../common/jsonResponse');

/* Verifies if the user is of admin role to update or delete questions*/
function isAdminCheck(req, res, next) {
    if (req.session.userRole == 'admin') {
        next();
    } else {
        const error = "You are not authorized on to perform this action"
        return JsonResponse.fail(403, error).send(res);
    }
}

function isLoggedInCheck(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        const error = "Please log in to access the questions"
        return JsonResponse.fail(401, error).send(res);
    }
}

module.exports = { isAdminCheck, isLoggedInCheck }