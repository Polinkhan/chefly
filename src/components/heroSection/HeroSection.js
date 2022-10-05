import { Chakra, icons } from "../../AllComponents";
import { Link } from "react-router-dom";
import FooterSection from "../footerSection/FooterSection";

export default function HeroSection() {
  return (
    <Chakra.Box className={"heroBg"}>
      <Chakra.Container maxW={"7xl"}>
        <Chakra.Stack
          h={"100vh"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Chakra.Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Chakra.Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Chakra.Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "20%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "teal.300",
                  zIndex: -1,
                  filter: "blur(5px)",
                }}
              >
                CHEFLY
              </Chakra.Text>
              <br />
              <Chakra.Text as={"span"} color={"teal.400"}>
                use everywhere!
              </Chakra.Text>
            </Chakra.Heading>
            <Chakra.Text color={"gray.500"}>
              A Free Social App free to use !!
            </Chakra.Text>
            <Chakra.Stack spacing={4} direction={"row"} pt={8}>
              <Link to={"/register"}>
                <Chakra.Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  colorScheme={"teal"}
                  bg={"teal.400"}
                  _hover={{ bg: "teal.500" }}
                >
                  Sign Up
                </Chakra.Button>
              </Link>
              <Link to={"/login"}>
                <Chakra.Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                >
                  Sign In
                </Chakra.Button>
              </Link>
            </Chakra.Stack>
          </Chakra.Stack>
          <Chakra.Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Chakra.Box
              mt={"40"}
              position={"relative"}
              height={"300px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <Chakra.IconButton
                aria-label={"Play Button"}
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                // icon={<PlayIcon w={12} h={12} />}
                size={"lg"}
                color={"white"}
                position={"absolute"}
                left={"50%"}
                top={"50%"}
                transform={"translateX(-50%) translateY(-50%)"}
              />
              <Chakra.Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={
                  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                }
              />
            </Chakra.Box>
          </Chakra.Flex>
        </Chakra.Stack>
      </Chakra.Container>
      <FooterSection />
    </Chakra.Box>
  );
}
