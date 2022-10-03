import { Chakra, Contexts, icons } from "../../AllComponents";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";

const DropZone = ({ onClose }) => {
  const toast = Chakra.useToast();
  const { updateDatabase, currentUser } = Contexts.useFirebaseContext();
  const [property, setProperty] = useState({
    img: "",
    btnLoad: false,
    dropZoneColor: "gray.100",
  });

  const makeToast = (STATUS, MESSAGE) => {
    toast({
      description: MESSAGE,
      status: STATUS,
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProperty({ ...property, btnLoad: true });
    updateDatabase({ photoURL: property.img }, currentUser.uid)
      .then(() => {
        onClose();
        makeToast("success", "Profile Picture Updated");
      })
      .catch((error) => makeToast("error", error.message))
      .finally(() => setProperty({ ...property, btnLoad: false }));
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        100,
        0,
        (uri) => resolve(uri),
        "base64"
      );
    });

  const setFile = async (file) => {
    try {
      const image = await resizeFile(file);
      setProperty({ ...property, img: image });
    } catch (err) {
      makeToast("error", err.message);
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
    isDragActive
      ? setProperty({ ...property, dropZoneColor: "gray.300" })
      : setProperty({ ...property, dropZoneColor: "gray.100" });
  }, [isDragActive]);//eslint-disable-line

  return (
    <Chakra.Stack as={"form"} onSubmit={handleSubmit} spacing={"8"}>
      <Chakra.FormControl id="img">
        <Chakra.FormLabel px={4}>Uplaod Image</Chakra.FormLabel>
        {property.img ? (
          <Chakra.Center>
            <Chakra.Image src={property.img} />
          </Chakra.Center>
        ) : (
          <Chakra.VStack
            h={"200px"}
            {...getRootProps()}
            border={"1px dotted"}
            bg={property.dropZoneColor}
            transition={"0.2s"}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <Chakra.Input {...getInputProps()} />
            <Chakra.Text>Drop or Click to upload file here </Chakra.Text>
            <Chakra.Text>[ img or png file only ]</Chakra.Text>
            <Chakra.Text fontSize={"6xl"} color={"gray"}>
              <icons.IoCloudUploadOutline />
            </Chakra.Text>
          </Chakra.VStack>
        )}
      </Chakra.FormControl>
      <Chakra.Center>
        {property.img && (
          <Chakra.Button
            rounded={"full"}
            isLoading={property.btnLoad}
            colorScheme={"teal"}
            type={"submit"}
          >
            Submit
          </Chakra.Button>
        )}
      </Chakra.Center>
    </Chakra.Stack>
  );
};

export default DropZone;
