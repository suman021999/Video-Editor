// server/index.js


import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import UserRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5317",
     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/api/v1/user", UserRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});