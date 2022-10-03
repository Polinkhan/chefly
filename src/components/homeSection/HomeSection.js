import { Chakra, Contexts } from "../../AllComponents";
function HomeSection() {
  const { fullDB, currentUser } = Contexts.useFirebaseContext();
  const myDB = fullDB[currentUser.uid];

  return (
    fullDB[currentUser.uid] && (
      <Chakra.Center h="calc(100vh - 60px)" w={"100%"}>
        <Chakra.Center h={"100%"} w={"100%"}>
          <Chakra.VStack
            w={"300px"}
            h={"100%"}
            display={{ base: "none", lg: "flex" }}
          ></Chakra.VStack>
          <Chakra.VStack w={"100%"} maxW={"800px"} h={"100%"} boxShadow={"lg"}>
            <Chakra.VStack
              w={"90%"}
              h={"300px"}
              mt={"5%"}
              rounded={"lg"}
              bg={"gray.200"}
              pb={"5"}
            >
              <Chakra.Center
                h={"15%"}
                fontSize={"2xl"}
                fontWeight={"bold"}
                borderBottom={"2px"}
                borderColor={"gray.300"}
                p={"5"}
              >
                Create Post
              </Chakra.Center>
              <Chakra.VStack
                h={"70%"}
                w={"100%"}
                alignItems={"start"}
                p={"4"}
                justifyContent={"space-between"}
              >
                <Chakra.Center>
                  <Chakra.Avatar src={myDB.photoURL} />
                  <Chakra.Text px={"2"} fontWeight={"bold"}>
                    {myDB.displayName}
                  </Chakra.Text>
                </Chakra.Center>
                <Chakra.Center w={"100%"}>
                  <Chakra.Textarea
                    resize={"none"}
                    variant={"unstyled"}
                    autoFocus
                    placeholder={"What's On Your Mind, " + myDB.displayName}
                    my={"auto"}
                    fontSize={"2xl"}
                  ></Chakra.Textarea>
                </Chakra.Center>
              </Chakra.VStack>
              <Chakra.Center h={"20%"} w={"100%"}>
                <Chakra.Button w={"90%"} maxW={"600px"} colorScheme={"teal"}>
                  Post
                </Chakra.Button>
              </Chakra.Center>
            </Chakra.VStack>
          </Chakra.VStack>
          <Chakra.VStack
            w={"300px"}
            h={"100%"}
            display={{ base: "none", lg: "flex" }}
          ></Chakra.VStack>
        </Chakra.Center>
      </Chakra.Center>
    )
  );
}

export default HomeSection;
