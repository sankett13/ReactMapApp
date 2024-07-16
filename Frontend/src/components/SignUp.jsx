import React, { useState } from "react";
import "./SignUp.css";
import { json, Link } from "react-router-dom"; // Import Link from react-router-dom
import GooglAuth from "./GoogleAuth";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signup(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status == 200) {
      alert("SignUp Successful");
    } else {
      alert("SignUp Failed");
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={signup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="input-field"
          required
          value={name}
          onChange={(ev) => {
            setname(ev.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="input-field"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          required
          value={password}
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
        />
        <button className="submit-button">Sign Up</button>
      </form>
      <div className="account-info">
        <p>
          Already signed up? <Link to="/login">Go to login</Link>
        </p>
      </div>
      <div className="googleButton">
        <GooglAuth></GooglAuth>
      </div>
    </div>
  );
};

export default Signup;
