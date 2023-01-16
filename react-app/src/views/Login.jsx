import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const onSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <input type="email" name="email" id="email" placeholder="Email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input type="submit" value="Login" className="btn btn-block" />
          <p className="message">
            Not Registered? <Link to="/signup">Create an account!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
