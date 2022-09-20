import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Center, Container, Stack, Text, VStack } from "@chakra-ui/layout";
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
import React, { useEffect, useState } from "react";
import { useFirebaseContext } from "../../contexts/FirebaseContext";

const MyAccount = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { Data, setData, currentUser } = useFirebaseContext();

  useEffect(() => {
    setData({
      name: currentUser.displayName,
      url: currentUser.photoURL,
    });
  }, [currentUser.displayName, currentUser.photoURL]); //eslint-disable-line

  return (
    <Container maxW={"6xl"}>
      <Center h={"50vh"} boxShadow={"lg"}>
        <VStack>
          <Text>Name :{Data.name}</Text>
          <Button onClick={onOpen}> Update Profile </Button>
        </VStack>
      </Center>
      <OpenModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

function OpenModal({ isOpen, onClose }) {
  const { Data, updateMyProfile } = useFirebaseContext();
  const [name, setName] = useState(Data.name);
  const [url, setUrl] = useState(Data.url);
  const [shouldBtnLoad, setBtnLoad] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoad(true);
    updateMyProfile(name, url)
      .then(() => {})
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
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack as={"form"} onSubmit={handleSubmit} spacing={"8"}>
            <FormControl id="email">
              <FormLabel px={4}>Name</FormLabel>
              <Input
                autoComplete="off"
                isRequired
                type="text"
                rounded={"full"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="img">
              <FormLabel px={4}>Uplaod Avatar</FormLabel>
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
