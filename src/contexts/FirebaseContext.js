import { auth, db } from "../util/init-firebase";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile, updateEmail } from "@firebase/auth";
import { collection, setDoc, onSnapshot, doc, getDoc } from "firebase/firestore";

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
  const [fullDB, setFullDB] = useState(null);

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
    console.log("line 36");
    currentUser && updateDatabase({ ...myDB, [value]: input });
    console.log("line 38", value, input, currentUser);
    if (currentUser && value === "displayName") {
      console.log("line 40");
      return updateProfile(auth.currentUser, {
        [value]: input,
      });
    } else if (currentUser && value === "email") {
      return updateEmail(auth.currentUser, input);
    }
  };

  const logout = () => {
    setMyDB({});
    return signOut(auth);
  };

  const updateDatabase = (updatedDatabase) => {
    console.log("line 55");
    return setDoc(doc(db, "UsersData", currentUser.uid), updatedDatabase);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrenUser(user);
      else setCurrenUser(false);
    });
    return () => unSubscribe();
  }, []);

  const searchUserById = async (id) => {
    return await getDoc(doc(db, "UsersData", id));
  };

  const friendRequest = (UserId, UserData) => {
    return setDoc(doc(db, "UsersData", UserId), UserData);
  };

  useEffect(() => {
    currentUser &&
      onSnapshot(doc(db, "UsersData", currentUser.uid), (snap) => {
        if (snap.exists()) {
          setMyDB(snap.data());
        } else {
          console.log(currentUser);
          updateDatabase({ displayName: currentUser.displayName, photoURL: currentUser.photoURL, sendRequestList: {}, receiveRequestList: {}, friendList: {} });
        }
      });

    onSnapshot(collection(db, "UsersData"), (snap) => {
      const FULLDATA = {};
      snap.docs.forEach((doc) => {
        FULLDATA[doc.id] = doc.data();
      });
      console.log("FUll data Update");
      setFullDB(FULLDATA);
    });
  }, [currentUser]); //eslint-disable-line

  const value = { currentUser, setCurrenUser, myDB, fullDB, setMyDB, register, login, logout, signInWithGoogle, updateMyProfile, updateDatabase, searchUserById, friendRequest };

  return <FirebaseContext.Provider value={value}>{props.children}</FirebaseContext.Provider>;
};

export default FirebaseContextProvider;
