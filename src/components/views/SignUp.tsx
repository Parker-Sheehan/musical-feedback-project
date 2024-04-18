import { useRef } from "react";
import { Link } from "react-router-dom";
// import "./SignUp.css"
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/store"; 
import { signIn } from "../../store/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { LoginDispatchBody } from "./LogIn";

axios.defaults.withCredentials = true

const SignUp = () => {

  let navigate = useNavigate()

  const dispatch = useAppDispatch()


  const displayNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  let validateEmail = (email:string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  


  const signUpHandler = async() => {
    console.log("sign up handler hit")
    console.log(displayNameRef.current?.value)
    if(displayNameRef.current?.value && emailRef.current?.value && passwordRef.current?.value && passwordRef.current?.value === confirmPasswordRef.current?.value){

      console.log(validateEmail(emailRef.current?.value))
      if(validateEmail(emailRef.current?.value) === false){
        return alert("please enter valid email")
      }

      let bodyObj = {
        displayName: displayNameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      }
      console.log(bodyObj)
      
      try{
        const account = await axios.post("http://localhost:3000/signUp", bodyObj)

        let loginDispatchBody: LoginDispatchBody = {
          userId: account.data.userId,
          genreArray: [],
          songInReview: account.data.songInReview,
          userReviewToken: account.data.userReviewToken
        };
  
        dispatch(signIn(loginDispatchBody))
  
        return navigate("/Profile")
      }catch(err: any){
        return alert(err.response.data)
      }
    }else{
      return alert("Make sure all fields are filled out and passwords match")
    }
  }

  let loggedInUser = useAppSelector((state) => state.login)

  console.log(loggedInUser)



  return (
    <main className="size-full flex justify-center items-center">
    <div className="h-3/4 w-full xl:w-1/2 m-8 flex flex-col justify-between items-center bg-background2 rounded-lg py-20">
      <div className="text-prim flex justify-center items-center w-full flex-col" >
        <h1>Sign Up</h1>
        <h4>Hi, Welcome</h4>
      </div>

      {/* <div className="sign-up-with" id="with-google">
        <p>Login with Google</p>
      </div>
      <div id="break">
        <div className="line"></div>
        <p>or Register with Email</p>
        <div className="line"></div>
      </div> */}
      <div className="flex flex-col justify-around size-10/12 sm:w-1/2 lg:w-1/3 text-text">
        <div className="text-text">
        <label htmlFor="display-name-input">Display Name</label>
        <input ref={displayNameRef} type="text" className="text-input h-35 w-full border border-gray-300 rounded text-black" id="display-name-input" />
        </div>
        <div className="text-text">
        <label htmlFor="email-input">Email</label>
        <input ref={emailRef} type="text" className="text-input h-35 w-full border border-gray-300 rounded text-black" id="email-input" />
        </div>
        <div className="text-text">
        <label htmlFor="password-input">Password</label>
        <input ref={passwordRef}type="text" className="text-input h-35 w-full border border-gray-300 rounded text-black" id="password-input" />
        </div>
        <div className="text-text">
        <label htmlFor="password-input">Confirm Password</label>
        <input ref={confirmPasswordRef} type="text" className="text-input h-35 w-full border border-gray-300 rounded text-black"  id="confirm-password-input" />
        </div>
        <button onClick={signUpHandler} className="flex justify-center items-center h-10 w-full bg-accent rounded">Sign Up</button>
      </div>
      <p className="text-text">
        Already have an account? <Link to="/LogIn" className="text-sec">Login</Link>
      </p>
    </div>
    </main>
  );
};

export default SignUp;
