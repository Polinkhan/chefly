import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import FirebaseContextProvider from "./contexts/FirebaseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <FirebaseContextProvider>
      <App />
    </FirebaseContextProvider>
  </ChakraProvider>
);
