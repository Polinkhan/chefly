import { useState } from "react";
import { Chakra, icons, Contexts } from "../../AllComponents";

const ManageFriend = () => {
  const menu = ["friendList", "sendRequestList", "receiveRequestList"];
  const { fullDB, currentUser } = Contexts.useFirebaseContext();
  const myDB = fullDB[currentUser.uid];

  return (
    <Chakra.Center h="calc(100vh - 60px)" w={"100%"}>
      <Chakra.Center h={"100%"} w={"100%"}>
        <Chakra.VStack
          w={"300px"}
          h={"100%"}
          display={{ base: "none", lg: "flex" }}
        ></Chakra.VStack>
        <Chakra.VStack w={"100%"} maxW={"800px"} h={"100%"} boxShadow={"lg"}>
          <Chakra.VStack
            divider={<Chakra.StackDivider />}
            w={"100%"}
            p={{ base: "5", md: "10" }}
            alignItems={"start"}
          >
            <Chakra.HStack
              fontSize={"4xl"}
              fontWeight={"bold"}
              color={"gray.600"}
              overflow={"hidden"}
            >
              <icons.IoBuild />
              <Chakra.Text>Manage Friends</Chakra.Text>
            </Chakra.HStack>
            <Chakra.VStack mt={"10"} w={"100%"}>
              <Chakra.Tabs w={"100%"}>
                <Chakra.TabList
                  w={"100%"}
                  overflow={"auto"}
                  py={"1"}
                  boxShadow={""}
                  mx={"auto"}
                  bg={"gray.100"}
                >
                  {menu.map((list, i) => (
                    <Chakra.Tab
                      mx={"auto"}
                      key={i}
                      textTransform={"capitalize"}
                    >
                      {list}
                    </Chakra.Tab>
                  ))}
                </Chakra.TabList>

                <Chakra.TabPanels>
                  {menu.map((list, i) => (
                    <Chakra.TabPanel key={i}>
                      <UserList userList={myDB[list]} propertyName={list} />
                    </Chakra.TabPanel>
                  ))}
                </Chakra.TabPanels>
              </Chakra.Tabs>
            </Chakra.VStack>
          </Chakra.VStack>
        </Chakra.VStack>
        <Chakra.VStack
          w={"300px"}
          h={"100%"}
          display={{ base: "none", lg: "flex" }}
        ></Chakra.VStack>
      </Chakra.Center>
    </Chakra.Center>
  );
};

const UserList = ({ userList, propertyName }) => {
  const { fullDB, currentUser, friendRequest } = Contexts.useFirebaseContext();
  const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
  const [selectedUser, setSelectedUser] = useState("");

  let otherPropertyName = "";
  if (propertyName === "friendList") {
    otherPropertyName = "friendList";
  }
  if (propertyName === "sendRequestList") {
    otherPropertyName = "receiveRequestList";
  }
  if (propertyName === "receiveRequestList") {
    otherPropertyName = "sendRequestList";
  }
  const handleClick = (toId) => {
    const fromId = currentUser.uid;
    const cloneFullDB = { ...fullDB };
    const toDB = cloneFullDB[toId];
    const fromDB = cloneFullDB[fromId];
    delete fromDB[propertyName][toId];
    delete toDB[otherPropertyName][fromId];
    friendRequest(fromId, fromDB).then(friendRequest(toId, toDB));
  };

  const acceptBtnClick = (toId) => {
    const fromId = currentUser.uid;
    const cloneFullDB = { ...fullDB };
    const fromDB = cloneFullDB[fromId];
    const toDB = cloneFullDB[toId];
    delete fromDB.receiveRequestList[toId];
    delete toDB.sendRequestList[fromId];
    fromDB.friendList[toId] = new Date().getTime();
    toDB.friendList[fromId] = new Date().getTime();
    friendRequest(fromId, fromDB).then(friendRequest(toId, toDB));
  };

  return (
    <Chakra.VStack
      divider={<Chakra.StackDivider />}
      py={8}
      w={"100%"}
      alignItems={"start"}
    >
      {Object.keys(userList).map((list) => (
        <Chakra.HStack
          p={"2"}
          key={list}
          w={"100%"}
          justifyContent={{ base: "space-between", md: "space-around" }}
        >
          <Chakra.HStack>
            <Chakra.Avatar
              size={"sm"}
              src={fullDB[list].photoURL}
            ></Chakra.Avatar>
            <Chakra.Text>{fullDB[list].displayName}</Chakra.Text>
          </Chakra.HStack>
          <Chakra.HStack>
            {propertyName === "receiveRequestList" && (
              <Chakra.IconButton
                onClick={() => acceptBtnClick(list)}
                size={"sm"}
                fontSize={"2xl"}
                icon={<icons.IoCheckmarkOutline />}
                colorScheme="teal"
                variant="outline"
              />
            )}
            <Chakra.IconButton
              onClick={() => {
                onOpen();
                setSelectedUser(list);
              }}
              size={"sm"}
              fontSize={"2xl"}
              icon={<icons.IoClose />}
              colorScheme="red"
              variant="outline"
            />
          </Chakra.HStack>
        </Chakra.HStack>
      ))}
      <ModalView
        isOpen={isOpen}
        onClose={onClose}
        user={selectedUser}
        handleClick={handleClick}
      />
    </Chakra.VStack>
  );
};

function ModalView({ isOpen, onClose, user, handleClick }) {
  console.log(user);
  return (
    <>
      <Chakra.Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <Chakra.ModalOverlay />
        <Chakra.ModalContent>
          <Chakra.ModalHeader>
            Are you sure you want to remove from
          </Chakra.ModalHeader>
          <Chakra.ModalCloseButton />
          <Chakra.ModalBody></Chakra.ModalBody>
          <Chakra.ModalFooter>
            <Chakra.Button colorScheme="red" mr={3} onClick={onClose}>
              Cancle
            </Chakra.Button>
            <Chakra.Button
              colorScheme="red"
              variant="outline"
              onClick={() => handleClick(user)}
            >
              Remove
            </Chakra.Button>
          </Chakra.ModalFooter>
        </Chakra.ModalContent>
      </Chakra.Modal>
    </>
  );
}

export default ManageFriend;
