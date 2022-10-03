import { Chakra, icons, Contexts } from "../../AllComponents";
import { useState } from "react";

const AddFriend = () => {
  const [userProperty, setUserProperty] = useState({
    id: "",
    data: null,
  });
  const [btnProperty, setBtnProperty] = useState({
    value: "Add Friend",
    variant: "solid",
    searchBtnLoad: false,
    sendBtnLoad: false,
    rightIcon: <icons.IoPersonAdd />,
  });

  const { searchUserById, friendRequest, currentUser, fullDB } =
    Contexts.useFirebaseContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBtnProperty({ ...btnProperty, searchBtnLoad: true });
    const result = await searchUserById(userProperty.id);
    setBtnProperty({ ...btnProperty, searchBtnLoad: false });
    setUserProperty({
      ...userProperty,
      data: result.exists() ? result.data() : null,
    });
  };

  const handleSendRequest = () => {
    setBtnProperty({ ...btnProperty, sendBtnLoad: true });
    // if (myDB.friendList[userProperty.id]) {
    //   console.log("user already in your friend List");
    //   setSendBtnLoad(false);
    // } else if (myDB.sendRequestList[userProperty.id]) {
    //   console.log("user already in your Send Request List");
    //   setSendBtnLoad(false);
    // } else if (myDB.receiveRequestList[userProperty.id]) {
    //   console.log("user already in your Receive Request List");
    //   setSendBtnLoad(false);
    // } else {
    const myNewDB = fullDB[currentUser.uid];
    const userNewDB = fullDB[userProperty.id];
    myNewDB.sendRequestList[userProperty.id] = new Date().getTime();
    userNewDB.receiveRequestList[currentUser.uid] = new Date().getTime();
    friendRequest(currentUser.uid, myNewDB).then(() =>
      friendRequest(userProperty.id, userNewDB).then(() => {
        setBtnProperty({
          value: "Request Sent",
          variant: "outline",
          sendBtnLoad: false,
          rightIcon: "",
        });
      })
    );
    // }
  };

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
            as="form"
            divider={<Chakra.StackDivider />}
            w={"100%"}
            p={10}
            onSubmit={handleSubmit}
            alignItems={"start"}
          >
            <Chakra.HStack
              fontSize={"4xl"}
              fontWeight={"bold"}
              color={"gray.600"}
            >
              <icons.IoPersonAdd />
              <Chakra.Text>Add Friend</Chakra.Text>
            </Chakra.HStack>
            <Chakra.VStack w={"100%"} mt={"10"}>
              <Chakra.Text textAlign={"center"} w={"100%"}>
                Add Your Friend By ID
              </Chakra.Text>
              <Chakra.InputGroup>
                <Chakra.InputRightElement>
                  <Chakra.IconButton
                    isLoading={btnProperty.searchBtnLoad}
                    icon={<icons.IoSearchOutline />}
                    variant={"ghost"}
                    onClick={handleSubmit}
                    _hover={{}}
                  />
                </Chakra.InputRightElement>
                <Chakra.Input
                  autoFocus
                  isRequired
                  focusBorderColor={"none"}
                  rounded={"full"}
                  bg={"gray.100"}
                  border={"none"}
                  placeholder={"Type Your Friend's ID Here"}
                  textAlign={"center"}
                  value={userProperty.id}
                  onChange={(e) =>
                    setUserProperty({ ...userProperty, id: e.target.value })
                  }
                />
              </Chakra.InputGroup>
            </Chakra.VStack>
          </Chakra.VStack>
          {userProperty.data && (
            <Chakra.HStack p={"2"} w={"100%"} justifyContent={"space-around"}>
              <Chakra.HStack w={"60%"}>
                <Chakra.Avatar
                  size={"sm"}
                  src={userProperty.data.photoURL}
                ></Chakra.Avatar>
                <Chakra.Text>{userProperty.data.displayName}</Chakra.Text>
              </Chakra.HStack>
              <Chakra.Button
                {...btnProperty}
                isLoading={btnProperty.sendBtnLoad}
                colorScheme="teal"
                onClick={handleSendRequest}
              >
                {btnProperty.value}
              </Chakra.Button>
            </Chakra.HStack>
          )}
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

export default AddFriend;
