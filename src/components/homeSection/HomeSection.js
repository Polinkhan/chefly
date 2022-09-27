import { Center, VStack, Text, Avatar, Textarea, Button } from "@chakra-ui/react";
import React from "react";
import { useFirebaseContext } from "../../contexts/FirebaseContext";

function HomeSection() {
  const { myDB } = useFirebaseContext();

  return (
    <Center h="calc(100vh - 60px)" w={"100%"}>
      <Center h={"100%"} w={"100%"}>
        <VStack w={"300px"} h={"100%"} display={{ base: "none", lg: "flex" }}></VStack>
        <VStack w={"100%"} maxW={"800px"} h={"100%"} boxShadow={"lg"}>
          <VStack w={"90%"} h={"300px"} mt={"5%"} rounded={"lg"} bg={"gray.200"} pb={"5"}>
            <Center h={"15%"} fontSize={"2xl"} fontWeight={"bold"} borderBottom={"2px"} borderColor={"gray.300"} p={"5"}>
              Create Post
            </Center>
            <VStack h={"70%"} w={"100%"} alignItems={"start"} p={"4"} justifyContent={"space-between"}>
              <Center>
                <Avatar src={myDB.photoURL} />
                <Text px={"2"} fontWeight={"bold"}>
                  {myDB.displayName}
                </Text>
              </Center>
              <Center w={"100%"}>
                <Textarea resize={"none"} variant={"unstyled"} autoFocus placeholder={"What's On Your Mind, " + myDB.displayName} my={"auto"} fontSize={"2xl"}></Textarea>
              </Center>
            </VStack>
            <Center h={"20%"} w={"100%"}>
              <Button w={"90%"} maxW={"600px"} colorScheme={"teal"}>
                Post
              </Button>
            </Center>
          </VStack>
        </VStack>
        <VStack w={"300px"} h={"100%"} display={{ base: "none", lg: "flex" }}></VStack>
      </Center>
    </Center>
  );
}

export default HomeSection;
