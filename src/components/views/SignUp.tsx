import { useRef } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css"
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/store"; 
import { signIn } from "../../store/slices/loginSlice";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true

const SignUp = () => {

  let navigate = useNavigate()

  const dispatch = useAppDispatch()


  const displayNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)


  const signUpHandler = async() => {
    console.log("sign up handler hit")
    console.log(displayNameRef.current?.value)
    if(displayNameRef.current?.value && emailRef.current?.value && passwordRef.current?.value && passwordRef.current?.value === confirmPasswordRef.current?.value){

      let bodyObj = {
        displayName: displayNameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      }
      console.log(bodyObj)
      
      const newAccount = await axios.post("http://localhost:3000/signUp", bodyObj)
      console.log(newAccount.data.userId)

      dispatch(signIn(newAccount.data.userId))

      return navigate("/Profile")

    }
  }

  let loggedInUser = useAppSelector((state) => state.login)

  console.log(loggedInUser)



  return (
    <div id="sign-up-container">
      <div id="greeting-container">
        <h1>Sign Up</h1>
        <h4>Hi, Welcome</h4>
      </div>

      <div className="sign-up-with" id="with-google">
        <p>Login with Google</p>
      </div>
      <div id="break">
        <div className="line"></div>
        <p>or Register with Email</p>
        <div className="line"></div>
      </div>
      <div id="use-email-container">
        <label htmlFor="display-name-input">Display Name</label>
        <input ref={displayNameRef} type="text" className="text-input" id="display-name-input" />
        <label htmlFor="email-input">Email</label>
        <input ref={emailRef} type="text" className="text-input" id="email-input" />
        <label htmlFor="password-input">Password</label>
        <input ref={passwordRef}type="text" className="text-input" id="password-input" />
        <label htmlFor="password-input">Confirm Password</label>
        <input ref={confirmPasswordRef} type="text" className="text-input"  id="confirm-password-input" />
        <button onClick={signUpHandler} id="sign-up-button">Sign Up</button>
      </div>
      <p>
        Already have an account? <Link to="/LogIn">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
