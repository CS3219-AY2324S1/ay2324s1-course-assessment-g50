const express = require('express');
const conversationRoute = require('./conversationRoutes');
const messageRoute = require('./messageRoutes');

const router = express.Router();

router.use('/conversations', conversationRoute);
router.use('/messages', messageRoute);

// Export combined router
module.exports = router;