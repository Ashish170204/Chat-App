import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "https://chat-app-1swp.onrender.com",    // //http://localhost:5173/
    methods: ["GET", "POST"],
    credentials: true
  },
});

// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

// used to listen events on server side.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  // const userId = socket.handshake.query.userId;
  const userId = socket.handshake.query.userId;
console.log("Socket connected:", socket.id, "with userId:", userId);

  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }

  // used to listen client side events emitted by server side (server & client)
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };