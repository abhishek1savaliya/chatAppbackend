const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/chat', chatRoutes);


module.exports = router;
