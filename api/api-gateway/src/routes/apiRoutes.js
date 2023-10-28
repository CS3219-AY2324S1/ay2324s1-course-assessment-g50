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
  isExceptionApi(exceptionUserApis, [isLoggedInCheck]),
  createProxyMiddleware({
    target: process.env.SANDBOX_SERVICE_URL,
    ...proxyOptions,
  })
);

router.use(
    "/matching",
    isLoggedInCheck,
    createProxyMiddleware({
        target: process.env.MATCHING_SERVICE_URL,
        ...proxyOptions,
    })
);

module.exports = router