import React from "react";
import "./LogIn.css";
import { Link } from "react-router-dom";

const LogIn = () => {
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
        <input type="text" className="text-input" id="email-input" />
        <label htmlFor="password-input">Password</label>
        <input type="text" className="text-input" id="password-input" />
        <div id="extra-login-actions-container">
          <div id="remember-me-container">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Rememver Me</label>
          </div>
          <a>Forgot Password?</a>
        </div>
        <button id="login-button">Login</button>
      </div>
      <p>
        Not registered yet? <Link to="/SignUp">Create an account</Link>
      </p>
    </div>
  );
};

export default LogIn;
