const User = require('../models/User');
const { generateToken, hashPassword, matchPassword } = require('../utils/authUtils');

exports.registerUser = async (req, res) => {
  const { fName, lName, username, email, password, image } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      fName,
      lName,
      username,
      image,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        fName: user.fName,
        lName: user.lName,
        status: user.status,
        image: user.image,
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await matchPassword(password, user.password))) {
      res.json({
        _id: user.id,
        fName: user.fName,
        lName: user.lName,
        image: user.image,
        status: user.status,
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
