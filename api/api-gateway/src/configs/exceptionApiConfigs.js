const exceptionUserApis = [
    { url: '/login', method: 'POST' },
    { url: '/logout', method: 'POST' },
    { url: '/', method: 'POST' },
]

const exceptionQuestionApis = [
    { url: '/', method: 'GET' }
]

// Accept exception apis, and middleware function lists, check if current endpoint need skipped or not.
const isExceptionApi = (exceptionApis, middlewares) => (req, res, next) => {
    // Recursively Execute each middleware functions
    const executeMiddleware = (index) => {
        if (index < middlewares.length) {
            middlewares[index](req, res, () => {
                executeMiddleware(index + 1);
            });
        } else {
            next();
        }
    }
    
    // Request api does not need to execute middleware functions
    if (exceptionApis.some(api => req.path === api.url && req.method === api.method)) {
        next();
    } else {
        executeMiddleware(0);
    }
};

module.exports = { exceptionUserApis, exceptionQuestionApis, isExceptionApi }
