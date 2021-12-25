import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase-config";

const auth = getAuth(app);

const AuthContext = createContext({
  user: null,
  register: () => {},
  loginWithEmail: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
});

const AuthProvider = (child) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const Unsub = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });

    return Unsub;
  }, []);

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      window.location.href = "/verify-login"
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, register, loginWithEmail, loginWithGoogle, logout }}
    >
      {child.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
