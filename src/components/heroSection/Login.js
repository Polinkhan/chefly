import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Center,
} from "@chakra-ui/react";
import { useLoginContext } from "../../contexts/LoginContext";

export default function Login() {
  const { setSignIn } = useLoginContext();

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        className={"logRegBg"}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={"white"}
          px={"10"}
          py={"20"}
          boxShadow={"2xl"}
          rounded={"2xl"}
        >
          <Center pb={"10"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          </Center>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" rounded={"full"} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" rounded={"full"} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox colorScheme={"teal"}>Remember me</Checkbox>
              <Link color={"teal.500"}>Forgot password?</Link>
            </Stack>
            <Button
              colorScheme={"teal"}
              variant={"solid"}
              rounded={"full"}
              onClick={() => setSignIn(true)}
            >
              Sign in
            </Button>
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
