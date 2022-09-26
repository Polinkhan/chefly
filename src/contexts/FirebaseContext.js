import { auth, db } from "../util/init-firebase";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile, updateEmail } from "@firebase/auth";
import { setDoc, onSnapshot, doc } from "firebase/firestore";

const FirebaseContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  signInWithGoogle: () => Promise,
  logout: () => Promise,
  updateMyProfile: () => Promise,
  updateDatabase: () => Promise,
});
export const useFirebaseContext = () => useContext(FirebaseContext);

const FirebaseContextProvider = (props) => {
  const [currentUser, setCurrenUser] = useState(null);
  const [myDB, setMyDB] = useState(null);

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
    if (value === "displayName") {
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

  const updateDatabase = (updatedDatabase) => {
    return setDoc(doc(db, "messenger", currentUser.uid), updatedDatabase);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrenUser(user);
      else setCurrenUser(false);
    });
    return () => unSubscribe();
  }, []);

  //"xbZ78MJkmTgBBENlyAFt"

  useEffect(() => {
    currentUser &&
      onSnapshot(doc(db, "messenger", currentUser.uid), (snap) => {
        if (snap.exists()) {
          setMyDB(snap.data());
        } else {
          updateDatabase({});
        }
      });
  }, [currentUser]); //eslint-disable-line

  const value = { currentUser, setCurrenUser, myDB, register, login, logout, signInWithGoogle, updateMyProfile, updateDatabase };

  return <FirebaseContext.Provider value={value}>{props.children}</FirebaseContext.Provider>;
};

export default FirebaseContextProvider;
