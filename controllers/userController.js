const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
console.log(email,password
);

  try {
    if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      _id: user._id,
      email: user.email,
    
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;


  try {
    
    
    const user = await User.findOne({ email });
    // console.log("login api!!",email, password);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({
        message: "Logged in successfully",
        data: {
          _id: user._id,
          name: user.name,       // Assuming user has a name field
          email: user.email,
          token: generateToken(user._id)
        }
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };
