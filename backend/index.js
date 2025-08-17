import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
// import path from "path";


dotenv.config();

// middleware
app.use(express.json());  
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's actual URL
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


// // .....................code for deployement......................
// if(process.env.NODE_ENV === "production"){
//   const dirPath=path.resolve();
//   app.use(express.static("./frontend/dist"));
//   app.get('*', (req,res) => {
//     res.sendFile(path.resolve(dirPath, './frontend/dist', 'index.html'));
//   })
// }

// add in package.json
// "dev": "nodemon index.js",
// "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"






server.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});