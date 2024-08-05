const express = require('express');
const {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);

router.get('/', getUserById);
router.get('/users', getAllUsers);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);

module.exports = router;