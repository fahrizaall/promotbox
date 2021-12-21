import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as GoogleIcon8 } from "../../assets/icon/icons8-google.svg";
import "./auth.scss";
import { useAuth } from "../../contexts/authContext";
// import { UserContext } from "../../App";

const Auth = () => {
  // const auth = getAuth();
  // const user = useContext(UserContext);
  const { user, register, loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(true);

  const [loginForm, setLoginForm] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const [registerForm, setRegisterForm] = useState({
    registerEmail: "",
    registerPassword: "",
    agreement: false,
  });

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "agreement") {
      value = e.target.checked;
    }

    if (registered) {
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
    registered ? (form = loginForm) : (form = registerForm);

    if (registered) {
      form = loginForm;
      loginWithEmail(form.loginEmail, form.loginPassword);
    } else {
      form = registerForm;

      if (registerForm.agreement) {
        register(form.registerEmail, form.registerPassword);
      }
    }

    console.log(form);
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, user);

  return (
    <div className="auth-container">
      <h1 className="brand">PromotBox</h1>

      <div className="auth-box">
        <div className="tabs">
          <div
            className={`login ${registered ? "active" : ""}`}
            onClick={() => setRegistered(true)}
          >
            <p>Login</p>
          </div>
          <div
            className={`register ${registered ? "" : "active"}`}
            onClick={() => setRegistered(false)}
          >
            <p>Register</p>
          </div>
        </div>
        <div className="auth-form">
          <GoogleIcon8
            stroke="white"
            fill="white"
            strokeWidth="0"
          />
          <p className="p-or">or</p>
          {registered ? (
            <div className="box-form login">
              <form
                name="login-form"
                action=""
                id="login-form"
                onSubmit={handleSubmit}
              >
                <label htmlFor="loginEmail">Email</label>
                <input
                  type="text"
                  name="loginEmail"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <label htmlFor="loginPassword">Password</label>

                <input
                  type="password"
                  name="loginPassword"
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
                <label htmlFor="registerEmail">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="registerEmail"
                  onChange={handleChange}
                />
                <label htmlFor="registerPassword">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="registerPassword"
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
