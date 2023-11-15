const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const { isAdminCheck, isLoggedInCheck } = require('../middlewares/AuthorisationCheck');
const { proxyOptions } = require('../configs/proxyConfigs')
const { exceptionUserApis, exceptionQuestionApis, isExceptionApi } = require('../configs/exceptionApiConfigs')
const {Request} = require("http-proxy-middleware/dist/types");
const {match} = require("http-proxy-middleware/dist/context-matcher");

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

module.exports = router