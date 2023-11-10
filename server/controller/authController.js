import { User } from "../../database/model.js";
import session from "express-session";
import bcrypt from "bcrypt";
import { where } from "sequelize";
// import dotenv from "dotenv"
// import jwt from "jsonwebtoken"

// dotenv.config()

const saltRounds = 10;


// let SECRET = process.env.SECRET


// const createToken = (email, id) => {
//   const payload = { email, id };
//   return jwt.sign(payload, SECRET);
// };

let signUp = async (req, res) => {
  console.log(req.body);
  let { displayName, email, password } = req.body;

  let foundUser = await User.findOne({ where: { email: email } });
  if (foundUser) {
    res.status(400).send("Account with email already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user = await User.create({
      displayName: displayName,
      email: email,
      password: hashedPassword,
    });

    // console.log(user.dataValues.email,"dv")
    // console.log(user.email,"eer")

    // const token = createToken(
    //   user.dataValues.email,
    //   user.dataValues.id
    // );

    // const exp = Date.now() + 1000 * 60 * 60 * 48;

    // console.log(user,"this is user")

    console.log(req.session)
    req.session.user = 100

    console.log(req.session.user,"session")

    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
      }
    });
    console.log(req.session, "after save")

    let bodyObj = {
      ...user.dataValues,
      // token: token,
      // exp: exp,
    }

    console.log(bodyObj, "yayyayyayyay")
  }

  // res.send(user)

  // console.log(user);
};

let login = async (req, res) => {
  console.log({...req.session})
  console.log(req.session.user, "this is session login")
  if(req.session.user){
    console.log('we got req sess user')
  }else{
    console.log("no req seesion user")
  }
  // console.log(req.body, "hit longin from the bacck");
  // let { email, password } = req.body;

  // let user = await User.findOne({
  //   where: {
  //     email: email,
  //   },
  // });

  // console.log(user);

  // if (user) {
  //   bcrypt.compare(password, user.password, (err, result) => {
  //     if (result) {
  //       res.send(result);
  //     } else {
  //       res.send(err);
  //     }
  //   });
  // }
};

export { signUp, login };
