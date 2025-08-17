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
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
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
// if(process.env.NODE_ENV === "production"){
//   const dirPath=path.resolve();
//   app.use(express.static("./frontend/dist"));
//   app.get('*', (req,res) => {
//     res.sendFile(path.resolve(dirPath, './frontend/dist', 'index.html'));
//   })
// }
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

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from "url";

// import userRoute from "./routes/user.route.js";
// import messageRoute from "./routes/message.route.js";
// import { app, server } from "./SocketIO/server.js";

// // ES module dirname/filename setup
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// // ------------------- Middlewares -------------------
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     credentials: true,
//   })
// );

// // ------------------- MongoDB Connection -------------------
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("✅ MongoDB connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   }
// };
// await connectDB();

// // ------------------- Routes -------------------
// app.use("/user", userRoute);
// app.use("/message", messageRoute);

// // ------------------- Deployment (Production) -------------------
// if (process.env.NODE_ENV === "production") {
//   const frontendPath = path.join(__dirname, "frontend", "dist");

//   app.use(express.static(frontendPath));

//   // ✅ FIX for Express 5
//   app.get(/.*/, (req, res) => {
//     res.sendFile(path.resolve(frontendPath, "index.html"));
//   });
// }


// // ------------------- Start Server -------------------
// const PORT = process.env.PORT || 5003;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
