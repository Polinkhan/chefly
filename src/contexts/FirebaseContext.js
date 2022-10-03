import { auth, db } from "../util/init-firebase";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import {
  collection,
  setDoc,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

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

  const logout = () => {
    return signOut(auth);
  };

  const updateDatabase = (updatedData, id) => {
    console.log(updatedData, currentUser.uid);
    return setDoc(doc(db, "UsersData", id), { ...fullDB[id], ...updatedData });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
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
    const unsub = onSnapshot(collection(db, "UsersData"), (snap) => {
      const FULLDATA = {};
      snap.docs.forEach((doc) => {
        FULLDATA[doc.id] = doc.data();
      });
      console.log("FUll data Update");
      setFullDB(FULLDATA);

      return () => unsub();
    });
  }, []); //eslint-disable-line

  const value = {
    currentUser,
    setCurrenUser,
    fullDB,
    register,
    login,
    logout,
    signInWithGoogle,
    updateDatabase,
    searchUserById,
    friendRequest,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
