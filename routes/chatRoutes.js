const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/chatController');
const protect = require('../middleware/authMiddleware');

router.use(protect);

router.post('/send', sendMessage);

module.exports = router;
