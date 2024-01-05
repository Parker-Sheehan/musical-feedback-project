// @ts-ignore
import { createRequire } from "module";
import { db } from "../database/model";
import { seed } from "../script/seed";
import { signUp, login, verifyToken } from "./controller/authController";
import session from "express-session";
import { getProfileInfo, updateProfile } from "./controller/userController";
import {createNewSong} from './controller/songController'
const require = createRequire(import.meta.url);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
require("dotenv").config();

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

// console.log("why",session,"what")

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

await db
  .sync
  // ()
    ({ force: true });
    // seed()

server.listen(3000, console.log("listening on port 3000"));
