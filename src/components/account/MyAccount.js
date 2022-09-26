import { Avatar, Button, IconButton, FormControl, FormLabel, useDisclosure, Input, InputGroup, InputRightElement, Box, Center, Container, Stack, Text, VStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useFirebaseContext } from "../../contexts/FirebaseContext";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { useCallback } from "react";
import Resizer from "react-image-file-resizer";

const MyAccount = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { currentUser, myDB } = useFirebaseContext();

  const ProfileItems = ["displayName", "email", "phoneNumber"];

  return (
    <Center h={"calc(100vh - 60px)"}>
      <Container maxW={"6xl"}>
        <Center h={"80vh"} w={"100%"} boxShadow={"lg"}>
          <Center h={"80%"} w={{ xl: "80%", base: "95%" }} bg={"gray.200"}>
            <VStack h={"100%"} w={"100%"} pb={"4"}>
              <Box h={"15%"}>
                <Avatar transform={"translateY(-50%)"} size={"2xl"} src={myDB.photoURL} cursor={"pointer"} transition={"0.2s"} border={"8px solid white"}>
                  <IconButton h={"100%"} w={"100%"} rounded={"50%"} variant={""} fontSize={"2xl"} color={"white"} icon={<FaRegEdit />} position={"absolute"} transition={"0.2s"} opacity={"0"} onClick={onOpen} _hover={{ opacity: ".5", backgroundColor: "black" }}></IconButton>
                </Avatar>
              </Box>
              <VStack h={"70%"} w={{ lg: "80%", base: "95%" }}>
                {ProfileItems.map((item, index) => (
                  <Center key={index} minW={"70%"} flexDirection={{ md: "row", base: "column" }} boxShadow={"md"} p={"4"} bg={"teal.200"} rounded={"lg"}>
                    <Text w={"150px"} textTransform={"capitalize"}>
                      {item}:
                    </Text>
                    <EditAble value={item} />
                  </Center>
                ))}
                <Center minW={"70%"} flexDirection={{ md: "row", base: "column" }} boxShadow={"md"} p={"4"} bg={"teal.200"} rounded={"lg"}>
                  <Text w={"150px"}>ID:</Text>
                  <Text>{currentUser.uid}</Text>
                </Center>
              </VStack>
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
      <Input textAlign={"center"} value={input} onChange={(e) => setInput(e.target.value)} bg={"transparent"} color={"black"} {...edit} />
    </InputGroup>
  );
};

function OpenModal({ isOpen, onClose }) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <DropZone onClose={onClose} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const DropZone = ({ onClose }) => {
  const [dropZoneColor, setDropZoneColor] = useState("gray.100");
  const [img, setImg] = useState(null);
  const { updateDatabase } = useFirebaseContext();
  const [shouldBtnLoad, setBtnLoad] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoad(true);
    updateDatabase({ photoURL: img })
      .then(() => {
        onClose();
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
        setBtnLoad(false);
      });
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(file, 200, 200, "JPEG", 100, 0, (uri) => resolve(uri), "base64");
    });

  const setFile = async (file) => {
    try {
      const image = await resizeFile(file);
      setImg(image);
    } catch (err) {
      console.log(err);
    }
  };

  const onDrop = useCallback((acceptedFile, rejectedFiles) => {
    setFile(acceptedFile[0]);
  }, []); //eslint-disable-line

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  useEffect(() => {
    isDragActive ? setDropZoneColor("gray.200") : setDropZoneColor("gray.100");
  }, [isDragActive]);

  return (
    <Stack as={"form"} onSubmit={handleSubmit} spacing={"8"}>
      <FormControl id="img">
        <FormLabel px={4}>Uplaod Image</FormLabel>
        {img ? (
          <Center>
            <Image src={img} />
          </Center>
        ) : (
          <VStack h={"200px"} {...getRootProps()} border={"1px dotted"} bg={dropZoneColor} justifyContent={"center"} cursor={"pointer"}>
            <Input {...getInputProps()} />
            <Text>Drop or Click to upload file here </Text>
            <Text>[ img or png file only ]</Text>
            <Text fontSize={"4xl"} color={"gray"}>
              <IoCloudUploadOutline />
            </Text>
          </VStack>
        )}
      </FormControl>
      <Center>
        {img && (
          <Button rounded={"full"} isLoading={shouldBtnLoad} colorScheme={"teal"} type={"submit"}>
            Submit
          </Button>
        )}
      </Center>
    </Stack>
  );
};

export default MyAccount;
