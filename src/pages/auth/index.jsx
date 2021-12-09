import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { ReactComponent as GoogleIcon8 } from "../../assets/icon/icons8-google.svg";
import "./auth.scss";

const Auth = () => {
  const [auth, setAuth] = useState(true);

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
          {auth ? (
            <div className="box-form login">
              <form action="">
                <input type="text" placeholder="username or email" />
                <input type="password" placeholder="password" />
                <Link to="#">lupa sandi?</Link>
                <button>Login</button>
              </form>
              <p>or</p>
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
                      stroke-width="0"
                    />
                  </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          ) : (
            <div className="box-form register">
              <form action="">
                <input type="text" placeholder="username" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />

                <div className="agreements">
                  <input type="checkbox" id="agreement" />
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
