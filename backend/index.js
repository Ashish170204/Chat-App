import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

// middleware
app.use(express.json());  
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://chat-app-1swp.onrender.com",
  credentials: true,
}));

const PORT = process.env.PORT || 5003;
const URI = process.env.MONGODB_URI;

try {
  await mongoose.connect(URI);
  console.log("MongoDB connected");
} catch (error) {
  console.log(error);
}


app.use("/user", userRoute);
app.use("/message", messageRoute);


// .....................code for deployement......................
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});

