// @ts-ignore
import { createRequire } from "module";
import { db } from "../database/model";
import { seed } from "../script/seed";
import { signUp, login } from "./controller/authController";
import session from "express-session";
import { getProfileInfo } from "./controller/userController";
const require = createRequire(import.meta.url);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const SequelizeStore = require('express-session-sequelize')(session.Store);


const sessionStore = new SequelizeStore({
  db 
});

require("dotenv").config();

interface SessionData {
  key: string;
  secret?: string;
  resave?: boolean | undefined;
  saveUninitialized?: boolean | undefined;
  genid?: Function | undefined;
  name?: string | undefined;
  proxy?: boolean | undefined;
  rolling?: boolean | undefined;
  store?: any;
  unset?: string | undefined;
  cookie?: any;
}

const sessionConfig: SessionData = {
  key: "userId",
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    expires:1000*60*60*24,
    sameSite: "none", // Set to 'none' for cross-origin access
    // secure: true, // Set to true if served over HTTPS
  },
};

app.use(session(sessionConfig));

console.log("why",session,"what")

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

interface SongInfo {
  id: number;
  userId: number;
  artLink: string;
  embeddedLink: string;
  title: string;
  genre: string;
}

interface ReviewInfo {
  id: number;
  reviewFor: number;
  author: string;
  totalScore: number;
  overallThoughts: string;
  musicalityScore: number;
  musicalityThoughts: string;
  grooveScore: number;
  grooveThoughts: string;
  soundDesignScore: number;
  soundDesignThoughts: string;
  arrangmentScore: number;
  arrangmentThoughts: string;
  mixMasterScore: number;
  mixMasterThoughts: string;
}

interface UserInfo {
  id: number;
  displayName: string;
  username: string;
  password: string;
  profilePicture: string;
  songInReview: number;
  genres: string[];
}

interface HasReviewed {
  id: number;
  userId: number;
  songId: number;
}

app.post("/signUp", signUp);

app.post("/login", login);

app.get("/getProfileInfo/:userId", getProfileInfo);

app.post("/createNewSong/:userId");

await db
  .sync
  // { force: true }
  ();

// seed()

server.listen(3000, console.log("listening on port 3000"));
