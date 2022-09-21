import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../util/init-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  updateEmail,
} from "@firebase/auth";

const FirebaseContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  signInWithGoogle: () => Promise,
  logout: () => Promise,
  updateMyProfile: () => Promise,
});
export const useFirebaseContext = () => useContext(FirebaseContext);

const FirebaseContextProvider = (props) => {
  const [currentUser, setCurrenUser] = useState(null);

  const register = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const login = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const updateMyProfile = (value, input) => {
    if (value === "displayName" || value === "photoURL") {
      return updateProfile(auth.currentUser, {
        [value]: input,
      });
    } else if (value === "email") {
      return updateEmail(auth.currentUser, input);
    }
  };
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrenUser(user);
      else setCurrenUser(false);
    });
    return () => unSubscribe();
  }, []);

  const value = {
    currentUser,
    setCurrenUser,
    register,
    login,
    logout,
    signInWithGoogle,
    updateMyProfile,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
