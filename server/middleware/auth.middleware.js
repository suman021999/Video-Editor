// middleware/auth.middleware.js

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { prisma } from "../lib/prisma.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 🔐 Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 👉 Get token
      token = req.headers.authorization.split(" ")[1];

      // 👉 Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 👉 Get user from DB (exclude password)
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          googleId: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // 👉 Attach user to request
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // ❌ No token
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});
