import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Box,
  Center,
  Container,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { useFirebaseContext } from "../../contexts/FirebaseContext";

const MyAccount = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { currentUser } = useFirebaseContext();

  const ProfileItems = ["displayName", "email", "phoneNumber"];

  // const x = "Boy";
  // console.log({ [x]: "polin" });

  return (
    <Center h={"calc(100vh - 60px)"}>
      <Container maxW={"6xl"}>
        <Center h={"80vh"} w={"100%"} boxShadow={"lg"}>
          <Center h={"80%"} w={{ xl: "80%", base: "95%" }} bg={"gray.200"}>
            <VStack h={"100%"} w={"100%"} pb={"4"}>
              <Box h={"15%"}>
                <Avatar
                  transform={"translateY(-50%)"}
                  size={"2xl"}
                  src={currentUser.photoURL}
                  cursor={"pointer"}
                  transition={"0.2s"}
                  border={"8px solid white"}
                >
                  <IconButton
                    h={"100%"}
                    w={"100%"}
                    rounded={"50%"}
                    variant={""}
                    fontSize={"2xl"}
                    color={"white"}
                    icon={<FaRegEdit />}
                    position={"absolute"}
                    transition={"0.2s"}
                    opacity={"0"}
                    onClick={onOpen}
                    _hover={{
                      opacity: ".5",
                      backgroundColor: "black",
                    }}
                  ></IconButton>
                </Avatar>
              </Box>
              <VStack h={"70%"} w={{ lg: "80%", base: "95%" }}>
                {ProfileItems.map((item, index) => (
                  <Center
                    key={index}
                    minW={"70%"}
                    flexDirection={{ md: "row", base: "column" }}
                    boxShadow={"md"}
                    p={"4"}
                    bg={"teal.200"}
                    rounded={"lg"}
                  >
                    <Text w={"150px"} textTransform={"capitalize"}>
                      {item}:
                    </Text>
                    <EditAble value={item} />
                  </Center>
                ))}
                <Center
                  minW={"70%"}
                  flexDirection={{ md: "row", base: "column" }}
                  boxShadow={"md"}
                  p={"4"}
                  bg={"teal.200"}
                  rounded={"lg"}
                >
                  <Text w={"150px"}>ID:</Text>
                  <Text>{currentUser.uid}</Text>
                </Center>
              </VStack>
              {/* <Center h={"15%"}>
                <Button onClick={onOpen}> Update Profile </Button>
              </Center> */}
            </VStack>
          </Center>
        </Center>
        <OpenModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </Center>
  );
};

const EditAble = ({ value }) => {
  const onEdit = { variant: "flushed", isReadOnly: false };
  const offEdit = { variant: "ghost", isReadOnly: true };

  const { currentUser, setCurrenUser, updateMyProfile } = useFirebaseContext();
  const [input, setInput] = useState(currentUser[value] || "");
  const [edit, setEdit] = useState(offEdit);
  const [isEditing, setEditing] = useState(false);
  const [shouldLoad, setLoad] = useState(false);
  const toast = useToast();

  return (
    <InputGroup>
      <InputRightElement>
        <IconButton
          display={isEditing ? "none" : "flex"}
          icon={<FaRegEdit />}
          variant={"solid"}
          // isLoading
          onClick={() => {
            setEdit(onEdit);
            setEditing(true);
          }}
        />
        <IconButton
          display={isEditing ? "flex" : "none"}
          icon={<FaCheck />}
          variant={"solid"}
          isLoading={shouldLoad}
          onClick={() => {
            setLoad(true);
            updateMyProfile(value, input)
              .then(() => {
                setLoad(false);
                setCurrenUser({
                  ...currentUser,
                  [value]: input,
                });
              })
              .catch((error) => {
                setInput(currentUser[value]);
                console.log(error.message);
                toast({
                  description: error.message,
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                });
              })
              .finally(() => {
                setEdit(offEdit);
                setEditing(false);
              });
          }}
        />
      </InputRightElement>
      <Input
        textAlign={"center"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        bg={"transparent"}
        color={"black"}
        {...edit}
      />
    </InputGroup>
  );
};

function OpenModal({ isOpen, onClose }) {
  const { currentUser, setCurrenUser, updateMyProfile } = useFirebaseContext();
  const [url, setUrl] = useState(currentUser.photoURL || "");
  const [shouldBtnLoad, setBtnLoad] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoad(true);
    updateMyProfile("photoURL", url)
      .then(() => {
        setCurrenUser({ ...currentUser, photoURL: url });
      })
      .catch((error) =>
        toast({
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      )
      .finally(() => {
        onClose();
        setBtnLoad(false);
      });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack as={"form"} onSubmit={handleSubmit} spacing={"8"}>
            <FormControl id="img">
              <FormLabel px={4}>Uplaod Image Src</FormLabel>
              <Input
                autoComplete="off"
                size={"md"}
                lineHeight={"6"}
                type="test"
                rounded={"full"}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </FormControl>
            <Center>
              <Button
                rounded={"full"}
                isLoading={shouldBtnLoad}
                colorScheme={"teal"}
                type={"submit"}
              >
                Submit
              </Button>
            </Center>
          </Stack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MyAccount;
