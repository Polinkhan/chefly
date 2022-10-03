import { Chakra, Contexts, icons } from "../../AllComponents";
import { useState } from "react";

const EditAble = ({ value }) => {
  const toast = Chakra.useToast();
  const { currentUser, fullDB, updateDatabase } = Contexts.useFirebaseContext();
  const [input, setInput] = useState(fullDB[currentUser.uid][value] || "");
  const [property, setProperty] = useState({
    isReadOnly: true,
    isEditing: false,
    shouldLoad: false,
    tooltip: "edit",
  });

  const makeToast = (STATUS, MESSAGE) => {
    toast({
      description: MESSAGE,
      status: STATUS,
      duration: 2000,
      isClosable: true,
    });
  };

  const handleClick = () => {
    setProperty({ ...property, shouldLoad: true });
    updateDatabase({ [value]: input }, currentUser.uid)
      .then(() => setProperty({ ...property, shouldLoad: false }))
      .catch((error) => {
        setInput(currentUser[value]);
        makeToast("error", error.message);
      })
      .finally(() => {
        setProperty({
          ...property,
          isReadOnly: true,
          isEditing: false,
          tooltip: "edit",
        });
        makeToast("success", "Updated");
      });
  };

  return (
    <Chakra.InputGroup>
      <Chakra.InputRightElement>
        <Chakra.Tooltip hasArrow label={property.tooltip}>
          <Chakra.IconButton
            display={property.isEditing ? "none" : "flex"}
            icon={<icons.FaRegEdit />}
            variant={"ghost"}
            onClick={() => {
              setProperty({
                ...property,
                isReadOnly: false,
                isEditing: true,
                tooltip: "Click to save",
              });
            }}
          />
        </Chakra.Tooltip>
        <Chakra.Tooltip hasArrow label={property.tooltip}>
          <Chakra.IconButton
            display={property.isEditing ? "flex" : "none"}
            icon={<icons.FaCheck />}
            isLoading={property.shouldLoad}
            variant={"ghost"}
            onClick={handleClick}
          />
        </Chakra.Tooltip>
      </Chakra.InputRightElement>
      <Chakra.Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        color={"black"}
        isReadOnly={property.isReadOnly}
      />
    </Chakra.InputGroup>
  );
};

export default EditAble;
