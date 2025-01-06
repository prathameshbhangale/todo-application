import User from '../models/User.js';
import { hashPassword,comparePassword } from '../utils/hashing.js';
import { generateToken } from '../utils/jwt.js';

// Register a new user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success:false, message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ name, email, passwordHash: hashedPassword });
    await newUser.save();

    res.status(201).json({ success:true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success:false, message: 'Server error', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({success:false, message: 'Invalid email or password' });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({success:false, message: 'Invalid email or password' });
    }

    const token = generateToken({ userId: user._id, email: user.email });
    res.setHeader('Authorization', `Bearer ${token}`);

    res.status(201).json({success:true, token, message: 'Login successful',user });
  } catch (err) {
    res.status(500).json({success:false, message: 'Server error', error: err.message });
  }
};