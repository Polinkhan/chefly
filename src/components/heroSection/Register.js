import { InputGroup, InputRightElement } from "@chakra-ui/input";
import {  Center,  Text } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useFirebaseContext } from "../../contexts/FirebaseContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(true);
  // const [name, setName] = useState({ first: "", last: "" });
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [shouldBtnLoad, setBtnLoad] = useState(false);

  const { register } = useFirebaseContext();

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoad(true);
    register(email, pass)
      .then(() => {
        navigate("/login");
        toast({
          title: "Sign Up Complete",
          description: "Redirect to Login Page",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1} align={"center"} justify={"center"} className={"logRegBg"}>
        <Stack
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
          <Stack spacing={4}>
            <Stack align={"center"} pb={"5"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Sign up
              </Heading>
            </Stack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                autoComplete="off"
                autoFocus
                type="email"
                rounded={"full"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  rounded={"full"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Text
                    cursor={"pointer"}
                    fontSize={"xl"}
                    color={"gray.600"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <IoEye /> : <IoEyeOff />}
                  </Text>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                size={"lg"}
                type={"submit"}
                colorScheme={"teal"}
                rounded={"full"}
                isLoading={shouldBtnLoad}
              >
                Sign Up
              </Button>
            </Stack>

            <Center pt={6}>
              <Text align={"center"}>Already a user?</Text>
              <Link to={"/login"}>
                <Text
                  px={"2"}
                  color={"teal.400"}
                  _hover={{ textDecoration: "underline" }}
                >
                  Login
                </Text>
              </Link>
            </Center>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
