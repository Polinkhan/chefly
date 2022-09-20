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
  const [Data, setData] = useState({ name: "", url: "" });

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

  const updateMyProfile = (name, url) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  };
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrenUser(user);
        setData({
          name: user.displayName,
          url: user.photoURL,
        });
      } else {
        setCurrenUser(false);
      }
    });
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const value = {
    currentUser,
    Data,
    setData,
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
