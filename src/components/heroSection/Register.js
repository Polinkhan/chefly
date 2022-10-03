import { Chakra, icons, Contexts } from "../../AllComponents";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const [name, setName] = useState({ first: "", last: "" });
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [shouldBtnLoad, setBtnLoad] = useState(false);

  const { register, currentUser, setCurrenUser, updateDatabase } =
    Contexts.useFirebaseContext();

  const toast = Chakra.useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoad(true);
    register(email, pass)
      .then((response) => {
        setCurrenUser(response.user);
        updateDatabase(
          {
            displayName: name.first + " " + name.last,
            photoURL: null,
            email: null,
            sendRequestList: {},
            receiveRequestList: {},
            friendList: {},
          },
          response.user.uid
        )
          .then(() => {})
          .catch((error) =>
            toast({
              description: error.message + "update Error",
              status: "error",
              duration: 4000,
              isClosable: true,
            })
          );
        //.finally(() => {});
      })
      .catch((error) =>
        toast({
          description: error.message + "reg Error",
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      )
      .finally(() => {
        setBtnLoad(false);
      });
  };

  return (
    <Chakra.Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Chakra.Flex
        flex={1}
        align={"center"}
        justify={"center"}
        className={"logRegBg"}
      >
        <Chakra.Stack
          as={"form"}
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={"white"}
          p={"10"}
          boxShadow={"2xl"}
          rounded={"2xl"}
          onSubmit={handleSubmit}
        >
          <Chakra.Stack spacing={4}>
            <Chakra.Stack align={"center"} pb={"5"}>
              <Chakra.Heading fontSize={"4xl"} textAlign={"center"}>
                Sign up
              </Chakra.Heading>
            </Chakra.Stack>
            <Chakra.HStack>
              <Chakra.FormControl id="email" isRequired>
                <Chakra.FormLabel>First Name</Chakra.FormLabel>
                <Chakra.Input
                  autoComplete="off"
                  autoFocus
                  type="text"
                  rounded={"full"}
                  value={name.first}
                  onChange={(e) =>
                    setName({ first: e.target.value, last: name.last })
                  }
                />
              </Chakra.FormControl>
              <Chakra.FormControl id="email" isRequired>
                <Chakra.FormLabel>Last Name</Chakra.FormLabel>
                <Chakra.Input
                  autoComplete="off"
                  type="text"
                  rounded={"full"}
                  value={name.last}
                  onChange={(e) =>
                    setName({ first: name.first, last: e.target.value })
                  }
                />
              </Chakra.FormControl>
            </Chakra.HStack>
            <Chakra.FormControl id="email" isRequired>
              <Chakra.FormLabel>Email address</Chakra.FormLabel>
              <Chakra.Input
                autoComplete="off"
                type="email"
                rounded={"full"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Chakra.FormControl>
            <Chakra.FormControl id="password" isRequired>
              <Chakra.FormLabel>Password</Chakra.FormLabel>
              <Chakra.InputGroup>
                <Chakra.Input
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  rounded={"full"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <Chakra.InputRightElement h={"full"}>
                  <Chakra.Text
                    cursor={"pointer"}
                    fontSize={"xl"}
                    color={"gray.600"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <icons.IoEye /> : <icons.IoEyeOff />}
                  </Chakra.Text>
                </Chakra.InputRightElement>
              </Chakra.InputGroup>
            </Chakra.FormControl>
            <Chakra.Stack spacing={10} pt={2}>
              <Chakra.Button
                size={"lg"}
                type={"submit"}
                colorScheme={"teal"}
                rounded={"full"}
                isLoading={shouldBtnLoad}
              >
                Sign Up
              </Chakra.Button>
            </Chakra.Stack>

            <Chakra.Center pt={6}>
              <Chakra.Text align={"center"}>Already a user?</Chakra.Text>
              <Link to={"/login"}>
                <Chakra.Text
                  px={"2"}
                  color={"teal.400"}
                  _hover={{ textDecoration: "underline" }}
                >
                  Login
                </Chakra.Text>
              </Link>
            </Chakra.Center>
          </Chakra.Stack>
        </Chakra.Stack>
      </Chakra.Flex>
      <Chakra.Flex flex={1}>
        <Chakra.Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Chakra.Flex>
    </Chakra.Stack>
  );
}
