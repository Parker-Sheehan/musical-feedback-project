import { useEffect, useRef } from "react";
// import "./LogIn.css";
import instance from "../../utils/axios";
import { useAppDispatch} from "../../store/store";
import { signIn, signOut } from "../../store/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Genre } from "./ProfilePage";
instance.defaults.withCredentials = true;

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

  useEffect(() => {
    console.log("use effect jhit")
    signOutHandler(); // Ensure user is logged out on component mount
  }, []);

  const signOutHandler = async () => {
    console.log("handler hit log out")
    await dispatch(signOut());
  };

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
            
      }catch(err: any){
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
