const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const { isAdminCheck, isLoggedInCheck } = require('../middlewares/AuthorisationCheck');
const { proxyOptions } = require('../configs/proxyConfigs')
const { exceptionUserApis, exceptionQuestionApis, isExceptionApi } = require('../configs/exceptionApiConfigs')

const router = express.Router()

// User apis:
router.use(
  "/users",
  isExceptionApi(exceptionUserApis, [isLoggedInCheck]),
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    ...proxyOptions,
  })
);

// Question apis: 
router.use(
  "/questions",
  isLoggedInCheck,
  isExceptionApi(exceptionQuestionApis, [isAdminCheck]),
  createProxyMiddleware({
    target: process.env.QUESTION_SERVICE_URL,
    ...proxyOptions,
  })
);

// Sandbox apis: 
router.use(
  "/sandbox",
  isLoggedInCheck,
  createProxyMiddleware({
    target: process.env.SANDBOX_SERVICE_URL,
    ...proxyOptions,
  })
);

let matchProxy = createProxyMiddleware({
    target: process.env.MATCHING_SERVICE_URL,
    // onClose: function(res, socket, head) { console.log('Client disconnected'); },
    ...proxyOptions,
    onError: (err, req, res, target) => {console.log("in onerror");}
})

router.use(
  "/matching",
  isLoggedInCheck,
    (req, socket, head) => {
        socket.on('close', (err) => {
            console.log("socket closed");
            req.emit('aborted');
        });
        return matchProxy(req, socket, head);
    }
);

// Communication apis: 
router.use(
  "/chat",
  isLoggedInCheck,
  createProxyMiddleware({
    target: process.env.COMMUNICATION_SERVICE_URL,
    ...proxyOptions,
  })
)

// Collaboration socket io apis: 
router.use(
  createProxyMiddleware('/collaboration', {
    target: process.env.COLLABORATION_SOCKET_URL,
    ...proxyOptions,
    ws: true, // Enable WebSocket proxying
  })
)

// Communication socket io apis: 
router.use(
  createProxyMiddleware('/socket.io', {
    target: process.env.COMMUNICATION_SOCKET_URL,
    ...proxyOptions,
    ws: true, // Enable WebSocket proxying
  })
)

module.exports = router