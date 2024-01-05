import { Genre, User, UserGenre } from "../../database/model.js";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const saltRounds = 10;

let SECRET = process.env.SECRET


const verifyToken = (req,res,next) => {
  const accessToken = req.cookies["access-token"]

  console.log(accessToken, 'access token')

  if(!accessToken){
    res.status(400).json({error: "User not authenticated"})
  }
  try{
    const validToken = jwt.verify(accessToken, SECRET)
    console.log(validToken, "valid token")
    if(validToken){
      req.authenticated = true
      console.log("returning next next")
      res.locals.userId = validToken.userId;  
      return next()
    }
  } catch(err){
    res.status(400).json({err})
  }
  console.log(accessToken)

}

let signUp = async (req, res) => {
  console.log(req.body);
  let { displayName, email, password } = req.body;

  let foundUser = await User.findOne({ where: { email: email } });
  if (foundUser) {
    res.status(400).send("Account with email already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try{

      let user = await User.create({
        displayName: displayName,
        email: email,
        password: hashedPassword,
      });
      const sess = req.session;
      sess.email = email;
      console.log('signed up')
      res.send(user)
    }
    catch(err){
      res.send("there was an error", err)
    }
  }
};

let login = async (req, res) => {

  console.log(req.body, "hit longin from authController");
  let { email, password } = req.body;

  try{
    let user = await User.findOne({
      where: {
        email: email,
      },
      include: [{
        model: Genre,
        through: UserGenre,
      }],
    });
    console.log(user,"user")

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          console.log('logging in')
          const sess = req.session;
          sess.email = email;
          res.send(user);
        } else {
          res.send("incorrect user and password combination",err);
        }
      });
    }
  }catch(err){
    res.send("no user with that email", err)
  }
};

export { signUp, login, verifyToken };
