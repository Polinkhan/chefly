import { Avatar, Button, IconButton, FormControl, FormLabel, useDisclosure, Input, InputGroup, InputRightElement, Box, Center, Container, Stack, Text, VStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast, Image, HStack, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { IoCloudUploadOutline, IoCopyOutline } from "react-icons/io5";
import { useFirebaseContext } from "../../contexts/FirebaseContext";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { useCallback } from "react";
import Resizer from "react-image-file-resizer";

const MyAccount = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { currentUser, fullDB } = useFirebaseContext();
  const myDB = fullDB[currentUser.uid];

  const ProfileItems = ["displayName", "email", "phoneNumber"];

  const [tooltip, setTooltip] = useState("Click to Copy");

  return (
    <Center h={"calc(100vh - 60px)"}>
      <Container maxW={"6xl"}>
        <Center h={"80vh"} w={"100%"} boxShadow={"lg"}>
          <VStack h={"70%"} w={{ lg: "80%", base: "95%" }}>
            <HStack h={"20%"} w={"100%"}>
              <HStack w={"150px"} justifyContent={"end"} fontWeight={"bold"}>
                <Text>Profile Picture</Text>
              </HStack>
              <Avatar p={"1"} size={"xl"} src={myDB.photoURL} bg={"white"} cursor={"pointer"} border={"4px solid gray"}>
                <IconButton h={"100%"} w={"100%"} rounded={"50%"} variant={""} fontSize={"2xl"} color={"white"} icon={<FaRegEdit />} position={"absolute"} transition={"0.2s"} opacity={"0"} onClick={onOpen} _hover={{ opacity: ".5", backgroundColor: "black" }}></IconButton>
              </Avatar>
            </HStack>
            <VStack h={"70%"} w={{ lg: "80%", base: "95%" }}>
              {ProfileItems.map((item, index) => (
                <HStack h={"15%"} w={"100%"} key={index}>
                  <HStack w={"150px"} justifyContent={"end"} fontWeight={"bold"}>
                    <Text>{item}</Text>
                  </HStack>
                  <EditAble value={item} />
                </HStack>
              ))}
              <HStack h={"15%"} w={"100%"}>
                <HStack w={"150px"} justifyContent={"end"} fontWeight={"bold"}>
                  <Text>ID</Text>
                </HStack>
                <InputGroup pl={8}>
                  <InputRightElement>
                    <Tooltip hasArrow label={tooltip}>
                      <IconButton
                        icon={<IoCopyOutline />}
                        variant={"ghost"}
                        onClick={() => {
                          setTooltip("Copied !!");
                          setTimeout(() => {
                            setTooltip("Click to Copy");
                          }, 2000);
                          navigator.clipboard.writeText(currentUser.uid);
                        }}
                      />
                    </Tooltip>
                  </InputRightElement>
                  <Input isDisabled value={currentUser.uid} />
                </InputGroup>
              </HStack>
            </VStack>
          </VStack>
        </Center>
        <OpenModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </Center>
  );
};

const EditAble = ({ value }) => {
  const onEdit = { isReadOnly: false };
  const offEdit = { isReadOnly: true };

  const { currentUser, fullDB, updateDatabase } = useFirebaseContext();
  const [input, setInput] = useState(fullDB[currentUser.uid][value] || "");
  const [edit, setEdit] = useState(offEdit);
  const [isEditing, setEditing] = useState(false);
  const [shouldLoad, setLoad] = useState(false);
  const [tooltip, setTooltip] = useState("edit");
  const toast = useToast();

  return (
    <InputGroup pl={8}>
      <InputRightElement>
        <Tooltip hasArrow label={tooltip}>
          <IconButton
            display={isEditing ? "none" : "flex"}
            icon={<FaRegEdit />}
            // isLoading
            variant={"ghost"}
            onClick={() => {
              setEdit(onEdit);
              setEditing(true);
              setTooltip("Save");
            }}
          />
        </Tooltip>
        <Tooltip hasArrow label={tooltip}>
          <IconButton
            display={isEditing ? "flex" : "none"}
            icon={<FaCheck />}
            isLoading={shouldLoad}
            variant={"ghost"}
            onClick={() => {
              console.log(fullDB[currentUser.uid]);
              setLoad(true);
              updateDatabase({ [value]: input }, currentUser.uid)
                .then(() => {
                  setLoad(false);
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
                  setTooltip("edit");
                });
            }}
          />
        </Tooltip>
      </InputRightElement>
      <Input value={input} onChange={(e) => setInput(e.target.value)} bg={"transparent"} color={"black"} {...edit} />
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
  const { updateDatabase, currentUser } = useFirebaseContext();
  const [shouldBtnLoad, setBtnLoad] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoad(true);
    updateDatabase({ photoURL: img }, currentUser.uid)
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
