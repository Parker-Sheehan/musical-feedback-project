import {useRef} from "react";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signIn } from "../../store/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Genre } from "./ProfilePage";
axios.defaults.withCredentials = true

export interface LoginDispatchBody { userId: number; genreArray: number[] }

const LogIn = () => {

  let navigate = useNavigate()

  const dispatch = useAppDispatch()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const loginHandler = async() => {
    console.log("login handler hit")
    if(emailRef.current?.value && passwordRef.current?.value){

      let bodyObj = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      }
      console.log(bodyObj)
      
      const account = await axios.post("http://localhost:3000/login", bodyObj)
      let genreArray: number[] = account.data.genres.map((genre:Genre) => {
       return genre.genreId
      })

      let loginDispatchBody: LoginDispatchBody = {
        userId: account.data.userId,
        genreArray: genreArray
      }

      console.log(account)

      dispatch(signIn(loginDispatchBody))

      return navigate("/Profile")

    }
  }


  return (
    <div id="login-container">
      <div id="greeting-container">
        <h1>Login</h1>
        <h4>Hi, Welcome back</h4>
      </div>

      <div className="login-with" id="with-google">
        <p>Login with Google</p>
      </div>
      <div id="break">
        <div className="line"></div>
        <p>or Login with Email</p>
        <div className="line"></div>
      </div>
      <div id="use-email-container">
        <label htmlFor="email-input">Email</label>
        <input type="text" className="text-input" id="email-input" ref={emailRef}/>
        <label htmlFor="password-input">Password</label>
        <input type="text" className="text-input" id="password-input" ref={passwordRef}/>
        <div id="extra-login-actions-container">
          <div id="remember-me-container">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Rememver Me</label>
          </div>
          <a>Forgot Password?</a>
        </div>
        <button onClick={loginHandler} id="login-button">Login</button>
      </div>
      <p>
        Not registered yet? <Link to="/SignUp">Create an account</Link>
      </p>
    </div>
  );
};

export default LogIn;
