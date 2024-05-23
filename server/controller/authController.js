import { Genre, User, UserGenre, Song } from "../../database/model.js";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import {Op} from "sequelize"

dotenv.config();

const saltRounds = 10;
 
let SECRET = process.env.SECRET;

const verifyToken = (req, res, next) => {
  console.log(req.session, req.session.email, "these are session email and thing" )
  if (!req.session || !req.session.email) {
    console.error('Unauthorized access attempt:', req.originalUrl);
    return res.status(302).send('http://localhost:3000');
  } 
// If user is authenticated, proceed to the next middleware
next();
};

let signUp = async (req, res) => {
  console.log(req.body);
  let { displayName, email, password } = req.body;

  let foundUser = await User.findOne({
    where: { [Op.or]: [{ email: email }, { displayName: displayName }] },
  });
  console.log(foundUser)
  if (foundUser) {
    res.status(400).send("Account with email or display name already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      let user = await User.create({
        displayName: displayName,
        email: email,
        password: hashedPassword,
      });
      const sess = req.session;
      sess.email = email;
      sess.userId = user.userId;
      console.log("signed up");
      res.send(user);
    } catch (err) {
      res.send("there was an error", err);
    }
  }
};

let login = async (req, res) => {
  console.log(req.body, "hit login from authController");
  let { email, password } = req.body;

  try {
    let user = await User.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: Genre,
          through: UserGenre,
        },
      ],
    });

    if (!user) {
      return res.status(400).send("No user with that email");
    }

    // Compare passwords using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Passwords match, set session variables
    const sess = req.session;
    sess.email = email;
    sess.userId = user.userId;

    res.send(user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};

let signOut = (req, res) => {
  // Destroy the session
  let rah = req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal server error');
    }
    // Redirect the user to the login page or any other appropriate page
    res.status(200).send("session destoryed")
  });
  console.log(rah, "tjos os rah")
}

export { signUp, login, verifyToken, signOut };
