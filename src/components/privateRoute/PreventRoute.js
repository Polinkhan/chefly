import React from "react";
import { Navigate, Outlet } from "react-router";
import { useFirebaseContext } from "../../contexts/FirebaseContext";

const PreventRoute = () => {
  const { currentUser } = useFirebaseContext();

  return currentUser ? <Navigate to="/home" /> : <Outlet />;
};

export default PreventRoute;
