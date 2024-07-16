import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  async function submit(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      alert("LoggedIn Successful");
      // setLoggedIn(true);
      // let LoggedIn = "true";
      const userdoc = await response.json();
      // console.log(userdoc.fullName);
      let dataSend = {
        LoggedIn: "true",
        UserName: userdoc.fullName,
      };
      navigate("/map", { state: dataSend });
    } else {
      alert("Incorrect Credentials");
    }
  }

  return (
    <div className="login-container">
      {/* <Navbar /> */}
      <h2>Login</h2>
      <form onSubmit={submit} className="login-form">
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
        <button type="submit">Log In</button>
      </form>
      <div className="signup-link">
        <p>
          New user? <Link to="/">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
