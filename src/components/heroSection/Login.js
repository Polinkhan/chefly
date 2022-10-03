import { Chakra, icons, Contexts } from "../../AllComponents";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isChecked, setChecked] = useState(true);
  const [shouldBtnLoad, setBtnLoad] = useState(false);
  const toast = Chakra.useToast();

  const { login, signInWithGoogle, updateDatabase } =
    Contexts.useFirebaseContext();
  const navigate = useNavigate();
  const location = useLocation();

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
          onSubmit={handlesubmit}
        >
          <Chakra.Center pb={"5"}>
            <Chakra.Heading fontSize={"2xl"}>
              Sign in to your account
            </Chakra.Heading>
          </Chakra.Center>
          <Chakra.FormControl id="email">
            <Chakra.FormLabel>Email address</Chakra.FormLabel>
            <Chakra.Input
              autoFocus
              isRequired
              type="email"
              rounded={"full"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Chakra.FormControl>
          <Chakra.FormControl id="password">
            <Chakra.FormLabel>Password</Chakra.FormLabel>
            <Chakra.InputGroup>
              <Chakra.Input
                isRequired
                autoComplete="off"
                rounded={"full"}
                type={showPassword ? "text" : "password"}
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
          <Chakra.Stack spacing={6}>
            <Chakra.Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Chakra.Checkbox
                colorScheme={"teal"}
                isChecked={isChecked}
                onChange={() => setChecked(!isChecked)}
              >
                Remember me
              </Chakra.Checkbox>
              <Link>
                <Chakra.Text
                  color={"teal.500"}
                  _hover={{ textDecoration: "underline" }}
                >
                  Forgot password?
                </Chakra.Text>
              </Link>
            </Chakra.Stack>
            <Chakra.Button
              type={"submit"}
              size="lg"
              colorScheme={"teal"}
              rounded={"full"}
              isLoading={shouldBtnLoad}
            >
              Sign In
            </Chakra.Button>
          </Chakra.Stack>
          <Chakra.Flex
            align={"center"}
            _before={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: Chakra.useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              mr: 4,
            }}
            _after={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: Chakra.useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              ml: 4,
            }}
          >
            <Chakra.Text as="h1">OR</Chakra.Text>
          </Chakra.Flex>
          <Chakra.Button
            size="lg"
            colorScheme={"red"}
            rounded={"full"}
            variant={"outline"}
            onClick={() => {
              signInWithGoogle().then((response) => {
                const user = response.user;
                updateDatabase(
                  {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    sendRequestList: {},
                    receiveRequestList: {},
                    friendList: {},
                  },
                  user.uid
                );
              });
            }}
          >
            Sign In with Google
          </Chakra.Button>
          <Chakra.Center>
            Not a member?
            <Link to={"/register"} replace>
              <Chakra.Text
                px={"2"}
                color={"teal.400"}
                _hover={{ textDecoration: "underline" }}
              >
                Sign Up
              </Chakra.Text>
            </Link>
          </Chakra.Center>
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
