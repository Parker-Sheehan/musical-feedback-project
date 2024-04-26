// @ts-ignore
import { createRequire } from "module";
import { db } from "../database/model";
import { seed } from "../script/seed";
import { signUp, login, verifyToken } from "./controller/authController";
import session from "express-session";
import { getProfileInfo, updateProfile, followUser, unfollowUser, getChatRooms, createNewMessage, getMessages, createChatRoom, messageSeen, userSearch, getPosts } from "./controller/userController";
import {createNewSong, getSong, getReviewSong, getSongProfileInfo, postCritique, getReviewInfo, addTokenToSong, submitCritiqueScore, likeSong} from './controller/songController'
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

 
  
app.use(express.json());
const corsOptions = {
  origin: function(origin, callback) {
    // Check if the request origin is allowed to access the resource
    // You may have more sophisticated logic here, this is just a basic example
    const allowedOrigins = ['http://localhost:5173'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'some random string',
  })
)

app.options('*', cors()); // Respond to all OPTIONS requests with CORS headers


app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signUp", signUp);

app.post("/login", login);

app.get("/getProfileInfo/:userId", verifyToken, getProfileInfo);

app.post("/createNewSong/:userId", verifyToken, createNewSong);

app.post("/updateProfileInfo/:userId", verifyToken, updateProfile)

app.get("/getSong/:songId", verifyToken, getSong)

app.get("/getReviewSong/:userId", verifyToken, getReviewSong)

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

app.post('/messageSeen', verifyToken, messageSeen)

app.post('/submitCritiqueScore', verifyToken, submitCritiqueScore)

app.get("/userSearch/:userSearch", verifyToken, userSearch)

app.get("/getPosts/:userId", verifyToken, getPosts)

app.post("/likeSong", verifyToken, likeSong)



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
  ()  
    // ({ force: true });
  // seed()
server.listen(3000, console.log("Express server listening on port 3000"));

// server.listen(3000, console.log("listening on port 3000"));
