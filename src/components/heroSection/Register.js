import { useColorModeValue } from "@chakra-ui/color-mode";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        className={"logRegBg"}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            bg={"white"}
            w={"full"}
            maxW={"lg"}
            p={"10"}
            boxShadow={"2xl"}
            rounded={"2xl"}
          >
            <Stack spacing={4}>
              <Stack align={"center"} pb={"5"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Sign up
                </Heading>
              </Stack>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" rounded={"full"} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" rounded={"full"} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" rounded={"full"} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    rounded={"full"}
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
                  rounded={"full"}
                  loadingText="Submitting"
                  size="lg"
                  bg={"teal.400"}
                  color={"white"}
                  _hover={{
                    bg: "teal.500",
                  }}
                >
                  Sign up
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
          </Box>
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
