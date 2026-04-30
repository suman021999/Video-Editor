// controllers/user.controller.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { prisma } from "../lib/prisma.js";



// ─── Helper: generate & set JWT cookie ────────────────────────────────────────
const generateToken = (res, userId, email) => {
  const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

// ─── Register ─────────────────────────────────────────────────────────────────
// POST /user/register
export const registerAccount = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  generateToken(res, user.id, user.email);

  res.status(201).json({
    message: "Account created successfully",
    user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
  });
});

// ─── Login ────────────────────────────────────────────────────────────────────
// POST /user/login
export const loginAccount = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  generateToken(res, user.id, user.email);

  res.status(200).json({
    message: "Logged in successfully",
    user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
  });
});

// ─── Google Login ─────────────────────────────────────────────────────────────
// POST /user/google
export const googleLogin = asyncHandler(async (req, res) => {
  const { googleId, email, name, avatar } = req.body;

  if (!googleId || !email) {
    return res.status(400).json({ message: "googleId and email are required" });
  }

  // Upsert: create user if new, update avatar/name if existing
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: { googleId, email, name, avatar },
    });
  } else {
    // Link googleId if account already exists via email
    user = await prisma.user.update({
      where: { email },
      data: { googleId, name, avatar },
    });
  }

  generateToken(res, user.id, user.email);

  res.status(200).json({
    message: "Google login successful",
    user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
  });
});

// ─── Logout ───────────────────────────────────────────────────────────────────
// POST /user/logout  (protected)
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});
