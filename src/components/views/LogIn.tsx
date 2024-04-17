import { useRef } from "react";
// import "./LogIn.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signIn } from "../../store/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Genre } from "./ProfilePage";
axios.defaults.withCredentials = true;

export interface LoginDispatchBody {
  userId: number;
  genreArray: number[];
  songInReview: number;
  userReviewToken: number;
}

const LogIn = () => {
  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = async () => {
    console.log("login handler hit");
    if (emailRef.current?.value && passwordRef.current?.value) {
      let bodyObj = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };
      console.log(bodyObj);

      try{
        
              const account = await axios.post("http://localhost:3000/login", bodyObj);
              let genreArray: number[] = account.data.genres.map((genre: Genre) => {
                return genre.genreId;
              });
        
              console.log(account.data);
        
              let loginDispatchBody: LoginDispatchBody = {
                userId: account.data.userId,
                genreArray: genreArray,
                songInReview: account.data.songInReview,
                userReviewToken: account.data.userReviewToken
              };
        
              console.log(account);
        
              dispatch(signIn(loginDispatchBody));
        
              return navigate("/Profile");
            
      }catch(err){
        alert(err.response.data)
      }
  }
}

  return (
    <main className="size-full flex justify-center items-center">
      <div
        className="h-3/4 w-full md:w-1/2 m-8 flex flex-col justify-between items-center bg-background2 rounded-lg py-20"
      >
        <div
          className="text-prim flex justify-center items-center w-full flex-col"
        >
          <h1>Login</h1>
          <h4>Hi, Welcome back</h4>
        </div>
{/* 
        <div
          className="login-with flex justify-center items-center h-40 w-full border border-gray-300 rounded bg-white"
          id="with-google"
        >
          <p>Login with Google</p>
        </div>

        <div
          className="flex justify-around items-center w-full text-gray-500"
        >
          <div className="line w-30 h-px bg-gray-300"></div>
          <p>or Login with Email</p>
          <div className="line w-30 h-px bg-gray-300"></div>
        </div> */}

        <div
          className="flex flex-col justify-around size-10/12 sm:w-1/2 lg:w-1/3 text-text"
        >
          <div className="text-text">
          <label htmlFor="email-input">Email</label>
          <input
            type="text"
            className="text-input h-35 w-full border border-gray-300 rounded text-black"
            id="email-input"
            ref={emailRef}
          />
          </div>
          <div className="text-text">
          <label htmlFor="password-input">Password</label>
          <input
            type="text"
            className="text-input h-35 w-full border border-gray-300 rounded text-black"
            id="password-input"
            ref={passwordRef}
          />
          </div>
          <div
            id="extra-login-actions-container"
            className="flex justify-between mt-25"
          >
            <div className="flex items-center">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <a className="text-sec" href="#">Forgot Password?</a>
          </div>
          <button
            onClick={loginHandler}
            className="flex justify-center items-center h-10 w-full bg-accent rounded"
          >
            Login
          </button>
        </div>

        <p className="text-text">
          Not registered yet? <a className="text-sec" href="/SignUp">Create an account</a>
        </p>
      </div>
    </main>
  );
};

export default LogIn;
