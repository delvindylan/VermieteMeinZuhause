import React from "react";
import Loginbox from "../components/Loginbox";
import { Link } from "react-router-dom";
import "../css/Login.css";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <div className="login-bg-image">
      <Navbar />
      <div className="login">
        <Loginbox />
        <div className="signInSuggestion">
          
        </div>
      </div>
    </div>
  );
};

export default Login;
