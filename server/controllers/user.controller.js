// controllers/user.controller.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { prisma } from "../lib/prisma.js";

// 🔑 Generate Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "990d",
  });
};


// ================= GOOGLE LOGIN =================
export const googleLogin = asyncHandler(async (req, res) => {
  const { name, email, googleId, avatar } = req.body;

  if (!email || !googleId) {
    return res.status(400).json({ message: "Google auth failed" });
  }

  let user = await prisma.user.findUnique({
    where: { email },
  });

  // 👉 If user NOT exists → create
  if (!user) {
    user = await prisma.user.create({
      data: {
        name,
        email,
        googleId,
        avatar,
      },
    });
  }

  // 👉 If exists but no googleId → attach it
  if (!user.googleId) {
    user = await prisma.user.update({
      where: { email },
      data: { googleId },
    });
  }

  const token = generateToken(user.id);

  res.json({
    message: "Google login success",
    user,
    token,
  });
});




// ================= REGISTER =================
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & Password required" });
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  res.status(201).json({
    message: "User registered",
    user,
    token,
  });
});



// ================= LOGIN =================
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id);

  res.json({
    message: "Login successful",
    user,
    token,
  });
});






// ================= LOGOUT =================
export const logoutUser = asyncHandler(async (req, res) => {
  // JWT logout is handled on frontend (remove token)
  res.json({ message: "Logged out successfully" });
});