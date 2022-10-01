import React from "react";
import { Avatar, Box, Button, Center, HStack, IconButton, Input, InputGroup, InputRightElement, StackDivider, Text, VStack } from "@chakra-ui/react";
import { IoSearchOutline, IoPersonAdd } from "react-icons/io5";
import { useState } from "react";
import { useFirebaseContext } from "../../AllComponents";

const AddFriend = () => {
  const [userId, setUserId] = useState("");
  const [btnLoad, setBtn] = useState(false);
  const [user, setUser] = useState(null);
  const [sendBtnLoad, setSendBtnLoad] = useState(false);

  const { searchUserById, friendRequest, currentUser, fullDB } = useFirebaseContext();
  const myDB = fullDB[currentUser.uid];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtn(true);
    const result = await searchUserById(userId);
    if (result.exists()) {
      setUser(result.data());
      setBtn(false);
    } else {
      setUser(null);
      setBtn(false);
    }
  };

  const handleSendRequest = () => {
    setSendBtnLoad(true);
    if (myDB.friendList[userId]) {
      console.log("user already in your friend List");
      setSendBtnLoad(false);
    } else if (myDB.sendRequestList[userId]) {
      console.log("user already in your Send Request List");
      setSendBtnLoad(false);
    } else if (myDB.receiveRequestList[userId]) {
      console.log("user already in your Receive Request List");
      setSendBtnLoad(false);
    } else {
      const cloneFullDB = { ...fullDB };
      const myNewDB = cloneFullDB[currentUser.uid];
      const userNewDB = cloneFullDB[userId];
      myNewDB.sendRequestList[userId] = new Date().getTime();
      userNewDB.receiveRequestList[currentUser.uid] = new Date().getTime();
      friendRequest(currentUser.uid, myNewDB).then(() => friendRequest(userId, userNewDB).then(() => setSendBtnLoad(false)));
    }
  };

  return (
    <Center h="calc(100vh - 60px)" w={"100%"}>
      <Center h={"100%"} w={"100%"}>
        <VStack w={"300px"} h={"100%"} display={{ base: "none", lg: "flex" }}></VStack>
        <VStack w={"100%"} maxW={"800px"} h={"100%"} boxShadow={"lg"}>
          <VStack as="form" divider={<StackDivider />} w={"100%"} p={10} onSubmit={handleSubmit} alignItems={"start"}>
            <HStack fontSize={"4xl"} fontWeight={"bold"} color={"gray.600"}>
              <IoPersonAdd />
              <Text>Add Friend</Text>
            </HStack>
            <VStack w={"100%"} mt={"10"}>
              <Text textAlign={"center"} w={"100%"}>
                Add Your Friend By ID
              </Text>
              <InputGroup>
                <InputRightElement>
                  <IconButton isLoading={btnLoad} icon={<IoSearchOutline />} variant={"ghost"} onClick={handleSubmit} _hover={{}} />
                </InputRightElement>
                <Input autoFocus isRequired focusBorderColor={"none"} rounded={"full"} bg={"gray.100"} border={"none"} placeholder={"Type Your Friend's ID Here"} textAlign={"center"} value={userId} onChange={(e) => setUserId(e.target.value)} />
              </InputGroup>
            </VStack>
          </VStack>
          {user && (
            <HStack p={"2"} w={"100%"} justifyContent={"space-around"}>
              <HStack w={"60%"}>
                <Avatar size={"sm"} src={user.photoURL}></Avatar>
                <Text>{user.displayName}</Text>
              </HStack>
              <Button rightIcon={<IoPersonAdd />} isLoading={sendBtnLoad} colorScheme="teal" variant="solid" onClick={handleSendRequest}>
                Add Friend
              </Button>
            </HStack>
          )}
        </VStack>
        <VStack w={"300px"} h={"100%"} display={{ base: "none", lg: "flex" }}></VStack>
      </Center>
    </Center>
  );
};

export default AddFriend;
