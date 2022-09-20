import React from "react";
import { Navigate, Outlet, useOutlet } from "react-router";
import { useFirebaseContext } from "../../contexts/FirebaseContext";

const PrivateRoute = () => {
  const { props } = useOutlet();
  const path = props.children.props.match.pathname;
  const { currentUser } = useFirebaseContext();
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: path }} />
  );
};

export default PrivateRoute;
