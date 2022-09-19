import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import LoginContextProvider from "./contexts/LoginContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  </ChakraProvider>
);
