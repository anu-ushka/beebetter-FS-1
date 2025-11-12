// import bcrypt from 'bcryptjs';
// import prisma from '../config/db.js';
// import { generateToken } from '../utils/generateToken.js';

// /**
//  * POST /api/auth/signup
//  * body: { name, email, password }
//  */
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Name, email and password are required' });
//     }
//     console.log(req.body)

//     const existing = await prisma.user.findUnique({ where: { email } });
//     if (existing) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }

//     const hashed = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashed
//       }
//     });

//     const token = generateToken(user.id);

//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /**
//  * POST /api/auth/login
//  * body: { email, password }
//  */
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = generateToken(user.id);

//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

/**
 * POST /api/auth/signup
 * Body: { name, email, password }
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email, and password are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User with this email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
