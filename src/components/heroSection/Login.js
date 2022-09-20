import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Center,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useFirebaseContext } from "../../contexts/FirebaseContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isChecked, setChecked] = useState(true);
  const [shouldBtnLoad, setBtnLoad] = useState(false);
  const toast = useToast();

  const { login, signInWithGoogle } = useFirebaseContext();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setBtnLoad(true);
    login(email, pass)
      .then(() => navigate(location.state?.from ?? "/"))
      .catch((error) =>
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
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
          onSubmit={handlesubmit}
        >
          <Center pb={"5"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          </Center>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              autoFocus
              isRequired
              type="email"
              rounded={"full"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                isRequired
                autoComplete="off"
                rounded={"full"}
                type={showPassword ? "text" : "password"}
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
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox
                colorScheme={"teal"}
                isChecked={isChecked}
                onChange={() => setChecked(!isChecked)}
              >
                Remember me
              </Checkbox>
              <Link>
                <Text
                  color={"teal.500"}
                  _hover={{ textDecoration: "underline" }}
                >
                  Forgot password?
                </Text>
              </Link>
            </Stack>
            <Button
              type={"submit"}
              size="lg"
              colorScheme={"teal"}
              rounded={"full"}
              isLoading={shouldBtnLoad}
              // onClick={() => setSignIn(true)}
            >
              Sign In
            </Button>
          </Stack>
          <Flex
            align={"center"}
            _before={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              mr: 4,
            }}
            _after={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              ml: 4,
            }}
          >
            <Text as="h1">OR</Text>
          </Flex>
          <Button
            size="lg"
            colorScheme={"red"}
            rounded={"full"}
            variant={"outline"}
            onClick={() => {
              signInWithGoogle();
            }}
          >
            Sign In with Google
          </Button>
          <Center>
            Not a member?
            <Link to={"/register"} replace>
              <Text
                px={"2"}
                color={"teal.400"}
                _hover={{ textDecoration: "underline" }}
              >
                Sign Up
              </Text>
            </Link>
          </Center>
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
