import { Chakra, Contexts, icons } from "../../AllComponents";
import { useState } from "react";
import DropZone from "./DropZone";
import EditAble from "./EditAble";

const MyAccount = () => {
  const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
  const { currentUser, fullDB } = Contexts.useFirebaseContext();
  const [tooltip, setTooltip] = useState("Click to Copy");
  const myDB = fullDB[currentUser.uid];
  const ProfileItems = ["displayName", "email", "phoneNumber"];

  return (
    <Chakra.Center h={"calc(100vh - 65px)"} bg={"gray.100"}>
      <Chakra.Container maxW={"6xl"}>
        <Chakra.VStack
          bg={"white"}
          h={"80vh"}
          w={{ lg: "80%", base: "100%" }}
          boxShadow={"lg"}
          mx={"auto"}
          fontWeight={"bold"}
          py={10}
          px={{ base: 5, md: 20 }}
          rounded={"xl"}
        >
          <Chakra.HStack h={"20%"} gap={10} w={"100%"}>
            <Chakra.Center w={"150px"}>Profile Picture</Chakra.Center>

            <Chakra.Avatar
              size={"2xl"}
              src={myDB.photoURL}
              cursor={"pointer"}
              boxShadow={"dark-lg"}
            >
              <Chakra.IconButton
                h={"100%"}
                w={"100%"}
                rounded={"50%"}
                fontSize={"sm"}
                color={"white"}
                icon={<icons.FaRegEdit />}
                position={"absolute"}
                transition={"0.2s"}
                opacity={"0"}
                onClick={onOpen}
                _hover={{
                  opacity: ".5",
                  backgroundColor: "black",
                  fontSize: "4xl",
                }}
              ></Chakra.IconButton>
            </Chakra.Avatar>
          </Chakra.HStack>
          <Chakra.VStack h={"90%"} w={"100%"}>
            {ProfileItems.map((item, index) => (
              <Chakra.Center
                pt={8}
                gap={4}
                w={"100%"}
                key={index}
                flexDirection={{ md: "row", base: "column" }}
              >
                <Chakra.HStack
                  w={"150px"}
                  justifyContent={{ base: "center", md: "end" }}
                  textTransform={"capitalize"}
                >
                  <Chakra.Text>{item}</Chakra.Text>
                </Chakra.HStack>
                <EditAble value={item} />
              </Chakra.Center>
            ))}
            <Chakra.Center
              pt={8}
              gap={4}
              w={"100%"}
              flexDirection={{ md: "row", base: "column" }}
            >
              <Chakra.HStack
                w={"150px"}
                justifyContent={{ base: "center", md: "end" }}
                fontWeight={"bold"}
                textTransform={"capitalize"}
              >
                <Chakra.Text>ID</Chakra.Text>
              </Chakra.HStack>
              <Chakra.InputGroup>
                <Chakra.InputRightElement>
                  <Chakra.Tooltip hasArrow label={tooltip}>
                    <Chakra.IconButton
                      icon={<icons.IoCopyOutline />}
                      variant={"ghost"}
                      onClick={() => {
                        setTooltip("Copied !!");
                        setTimeout(() => setTooltip("Click to Copy"), 2000);
                        navigator.clipboard.writeText(currentUser.uid);
                      }}
                    />
                  </Chakra.Tooltip>
                </Chakra.InputRightElement>
                <Chakra.Input isDisabled value={currentUser.uid} bg={"white"} />
              </Chakra.InputGroup>
            </Chakra.Center>
          </Chakra.VStack>
        </Chakra.VStack>
        <OpenModal isOpen={isOpen} onClose={onClose} />
      </Chakra.Container>
    </Chakra.Center>
  );
};



function OpenModal({ isOpen, onClose }) {
  return (
    <Chakra.Modal onClose={onClose} isOpen={isOpen} isCentered>
      <Chakra.ModalOverlay />
      <Chakra.ModalContent>
        <Chakra.ModalHeader>Update Image</Chakra.ModalHeader>
        <Chakra.ModalCloseButton />
        <Chakra.ModalBody>
          <DropZone onClose={onClose} />
        </Chakra.ModalBody>
        <Chakra.ModalFooter></Chakra.ModalFooter>
      </Chakra.ModalContent>
    </Chakra.Modal>
  );
}

export default MyAccount;
