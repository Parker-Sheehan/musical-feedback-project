import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css"

const SignUp = () => {
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
        <label htmlFor="email-input">Email</label>
        <input type="text" className="text-input" id="email-input" />
        <label htmlFor="password-input">Password</label>
        <input type="text" className="text-input" id="password-input" />
        <label htmlFor="password-input">Confirm Password</label>
        <input type="text" className="text-input"  id="confirm-password-input" />
        <button id="sign-up-button">Sign Up</button>
      </div>
      <p>
        Already have an account? <Link to="/LogIn">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
