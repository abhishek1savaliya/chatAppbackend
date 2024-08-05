const User = require('../models/User');

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { fName, lName, status, username, email, password } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fName = fName || user.fName;
    user.lName = lName || user.lName;
    user.status = status || user.status;
    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      user.password = await hashPassword(password);
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {

    const result = await User.deleteOne({ _id: req.user.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(202).json({ success: true, message: 'User removed' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
