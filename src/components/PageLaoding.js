import { Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import React from "react";

const PageLaoding = () => {
  return (
    <Center h={"20vh"}>
      <CircularProgress isIndeterminate color="blue.300" />
    </Center>
  );
};

export default PageLaoding;
