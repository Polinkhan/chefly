import { Text, VStack } from "@chakra-ui/layout";
import React from "react";

function NotFound() {
  return (
    <VStack h={"55vh"} justifyContent={"center"}>
      <Text as="h1" fontSize={"6xl"} fontWeight={"500"} color={"red.400"}>
        Error 404 !
      </Text>
      <Text as="h1" fontSize={"5xl"} color={"gray.400"}>
        Page Not Found
      </Text>
    </VStack>
  );
}

export default NotFound;
