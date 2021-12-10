import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { ReactComponent as GoogleIcon8 } from "../../assets/icon/icons8-google.svg";
import "./auth.scss";

const Auth = () => {
  const [auth, setAuth] = useState(true);

  const [loginForm, setLoginForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    agreement: false,
  });

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "agreement") {
      value = e.target.checked;
    }

    if (auth) {
      setLoginForm({
        ...loginForm,
        [name]: value,
      });
    } else {
      setRegisterForm({
        ...registerForm,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let form;
    auth ? (form = loginForm) : (form = registerForm);

    console.log(form);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="auth-container">
      <h1 className="brand">PromotBox</h1>

      <div className="auth-box">
        <div className="tabs">
          <div
            className={`login ${auth ? "active" : ""}`}
            onClick={() => setAuth(true)}
          >
            <p>Login</p>
          </div>
          <div
            className={`register ${auth ? "" : "active"}`}
            onClick={() => setAuth(false)}
          >
            <p>Register</p>
          </div>
        </div>
        <div className="auth-form">
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="google-btn"
              >
                <GoogleIcon8
                  stroke="white"
                  fill="white"
                  stroke="white"
                  strokeWidth="0"
                />
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <p className="p-or">or</p>
          {auth ? (
            <div className="box-form login">
              <form
                name="login-form"
                action=""
                id="login-form"
                onSubmit={handleSubmit}
              >
                <label htmlFor="usernameOrEmail">Username or email</label>
                <input
                  type="text"
                  name="usernameOrEmail"
                  placeholder="username or email"
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                />
                <Link to="#">lupa sandi?</Link>
                <button>Login</button>
              </form>
            </div>
          ) : (
            <div className="box-form register">
              <form
                action=""
                name="register-form"
                id="register-form"
                onSubmit={handleSubmit}
              >
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                />

                <div className="agreements">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    onChange={handleChange}
                  />
                  <label htmlFor="agreement" id="agreement">
                    <p>
                      Saya setuju dengan{" "}
                      <Link to="#">syarat dan ketentuan</Link> yang berlaku
                    </p>
                  </label>
                </div>
                <button>Register</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
