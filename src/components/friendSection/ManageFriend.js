import React from "react";
import { Avatar, Button, Center, HStack, StackDivider, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { IoPersonRemoveSharp, IoBuild, IoChevronDownOutline } from "react-icons/io5";
import { useFirebaseContext } from "../../AllComponents";

const ManageFriend = () => {
  const friendList = {
    ddsfsdfsdf: {
      name: "Polin",
      photoURL: "",
    },
    dbhfgh: {
      name: "Polin",
      photoURL: "",
    },
    ddsfsdfdfsdfssdf: {
      name: "Polibbbbbbbbn",
      photoURL: "",
    },
  };

  const menu = ["friendList", "sendRequestList", "receiveRequestList"];
  const { myDB } = useFirebaseContext();

  return (
    <Center h="calc(100vh - 60px)" w={"100%"}>
      <Center h={"100%"} w={"100%"}>
        <VStack w={"300px"} h={"100%"} display={{ base: "none", lg: "flex" }}></VStack>
        <VStack w={"100%"} maxW={"800px"} h={"100%"} boxShadow={"lg"}>
          <VStack divider={<StackDivider />} w={"100%"} p={{ base: "5", md: "10" }} alignItems={"start"}>
            <HStack fontSize={"4xl"} fontWeight={"bold"} color={"gray.600"} overflow={"hidden"}>
              <IoBuild />
              <Text>Manage Friends</Text>
            </HStack>
            <VStack mt={"10"} w={"100%"}>
              <Tabs w={"100%"}>
                <TabList w={"100%"} overflow={"auto"} py={"1"} boxShadow={""} mx={"auto"} bg={"gray.100"}>
                  {menu.map((list, i) => (
                    <Tab mx={"auto"} key={i} textTransform={"capitalize"}>
                      {list}
                    </Tab>
                  ))}
                </TabList>

                <TabPanels>
                  {menu.map((list, i) => (
                    <TabPanel key={i}>
                      <UserList userList={myDB[list]} propertyName={list} />
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </VStack>
          </VStack>
        </VStack>
        <VStack w={"300px"} h={"100%"} display={{ base: "none", lg: "flex" }}></VStack>
      </Center>
    </Center>
  );
};

const UserList = ({ userList, propertyName }) => {
  const { fullDB, currentUser, friendRequest } = useFirebaseContext();
  let otherPropertyName = "";
  if (propertyName === "sendRequestList") otherPropertyName = "receiveRequestList";
  if (propertyName === "receiveRequestList") otherPropertyName = "sendRequestList";
  const handleClick = (toId) => {
    const fromId = currentUser.uid;
    const cloneFullDB = { ...fullDB };
    const toDB = cloneFullDB[toId];
    const fromDB = cloneFullDB[fromId];
    delete fromDB[propertyName][toId];
    delete toDB[otherPropertyName][fromId];

    friendRequest(fromId, fromDB).then(friendRequest(toId, toDB));
  };

  return (
    <VStack divider={<StackDivider />} py={8} w={"100%"} alignItems={"start"}>
      {Object.keys(userList).map((list) => (
        <HStack p={"2"} w={"100%"} key={list} justifyContent={{ base: "space-between", md: "space-around" }}>
          <HStack>
            <Avatar size={"sm"} src={fullDB[list].photoURL}></Avatar>
            <Text>{fullDB[list].displayName}</Text>
          </HStack>
          <Button size={"sm"} onClick={() => handleClick(list)} rightIcon={<IoPersonRemoveSharp />} colorScheme="teal" variant="solid">
            Remove Request
          </Button>
        </HStack>
      ))}
    </VStack>
  );
};

export default ManageFriend;
