import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();
export const useLoginContext = () => useContext(LoginContext);

function LoginContextProvider(props) {
  const [isSignIn, setSignIn] = useState(false);

  const value = { isSignIn, setSignIn };

  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
