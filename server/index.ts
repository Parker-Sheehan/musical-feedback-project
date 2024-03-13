// @ts-ignore
import { createRequire } from "module";
import { db } from "../database/model";
import { seed } from "../script/seed";
import { signUp, login, verifyToken } from "./controller/authController";
import session from "express-session";
import { getProfileInfo, updateProfile, followUser, unfollowUser, getChatRooms, createNewMessage, getMessages, createChatRoom } from "./controller/userController";
import {createNewSong, getSong, getRandomSong, getSongProfileInfo, postCritique, getReviewInfo, addTokenToSong} from './controller/songController'
const require = createRequire(import.meta.url);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io"); // Import Socket.IO library
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// const SequelizeStore = require('express-session-sequelize')(session.Store);

// const sessionStore = new SequelizeStore({
//   db 
// });


// interface SessionData {
//   key: string;
//   secret?: string;
//   resave?: boolean | undefined;
//   saveUninitialized?: boolean | undefined;
//   genid?: Function | undefined;
//   name?: string | undefined;
//   proxy?: boolean | undefined;
//   rolling?: boolean | undefined;
//   store?: any;
//   unset?: string | undefined;
//   cookie?: any;
// }

// const sessionConfig: SessionData = {
//   key: "userId",
//   secret: process.env.SESSION_SECRET_KEY,
//   resave: false,
//   saveUninitialized: false,
//   store: sessionStore,
//   cookie: {
//     expires:1000*60*60*24,
//     sameSite: "none", // Set to 'none' for cross-origin access
//     // secure: true, // Set to true if served over HTTPS
//   },
// };

// app.use(session(sessionConfig));


app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'some random string',
  })
)

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signUp", signUp);

app.post("/login", login);

app.get("/getProfileInfo/:userId", verifyToken, getProfileInfo);

app.post("/createNewSong/:userId", verifyToken, createNewSong);

app.post("/updateProfileInfo/:userId", verifyToken, updateProfile)

app.get("/getSong/:songId", verifyToken, getSong)

app.get("/getRandomSong/:userId", verifyToken, getRandomSong)

app.get("/getSongProfileInfo/:songId", verifyToken, getSongProfileInfo)

app.post("/postCritique/:userId", verifyToken, postCritique)

app.get("/getReview/:reviewId", verifyToken, getReviewInfo)

app.post("/addTokenToSong/:songId", verifyToken, addTokenToSong)

app.post("/followUser/:loggedInUserId", verifyToken, followUser)

app.post("/unfollowUser/:loggedInUserId", verifyToken, unfollowUser)

app.get("/getChatRooms/:loggedInUserId", verifyToken, getChatRooms)

app.post("/createNewMessage", verifyToken, createNewMessage)

app.get("/getMessages/:chatRoomId", verifyToken, getMessages)

app.post("/createChatRoom", verifyToken, createChatRoom)


io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle joining chat rooms
  socket.on("joinRoom", (roomId) => {
    if(typeof(roomId) == typeof('string')){
      socket.join(roomId)
    }else{

      socket.join(roomId.toString());
    }
    console.log(`User joined chat room ${roomId}`);
  });

  // Handle leaving chat rooms
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId.toString());

    if(typeof(roomId) == typeof('string')){
      socket.leave(roomId);
    }else{

      socket.leave(roomId.toString());
    }

    console.log(`User left chat room ${roomId}`);
  });

  // Handle message broadcasting
  socket.on("sendMessage", (data) => {
    // Broadcast message to everyone in the same room
    console.log(data)
    io.to(data.roomId.toString()).emit("message", data);
  });

  socket.on("newChatRoom", (data) => {
    console.log(data)
    io.to(data.roomId).emit("newChatRoom", data)  
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// await db.sync();  

await db
  .sync
  // ()  
    ({ force: true });
  seed()
server.listen(3000, console.log("Express server listening on port 3000"));

// server.listen(3000, console.log("listening on port 3000"));
