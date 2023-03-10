import React, { useState } from "react";
import { useHistory } from "react-router-dom";
function SignUpForm({ onLogin, setShow }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    history.push("/profile");
  }

  return (
    <div className="login-form">
      <h1>Create Account</h1>
      <h2>Please enter your details to make an account.</h2>
        <div className="errors">
          {errors.map((err) => (
            <div key={err} className="error">Oops! {err}</div>
          ))}
        </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />

        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
             <div className="login-text">            
              <p className="small-text">
                Don't have an account? &nbsp;
                <button
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Sign In
                </button>
              </p>
            </div>

      </form>
    </div>
  );
}

export default SignUpForm;
