import { Chakra } from "../../AllComponents";

export default function FooterSection() {
  return (
    <Chakra.Box
      bg={Chakra.useColorModeValue("gray.50", "gray.900")}
      color={Chakra.useColorModeValue("gray.700", "gray.200")}
      h={"45vh"}
    >
      <Chakra.Container as={Chakra.Stack} maxW={"6xl"} py={10}>
        <Chakra.SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Chakra.Stack align={"flex-start"}>
            {/* <ListHeader>Product</ListHeader> */}
            <Chakra.Link href={"#"}>Overview</Chakra.Link>
            <Chakra.Stack direction={"row"} align={"center"} spacing={2}>
              <Chakra.Link href={"#"}>Features</Chakra.Link>
              <Chakra.Tag
                size={"sm"}
                bg={Chakra.useColorModeValue("green.300", "green.800")}
                ml={2}
                color={"white"}
              >
                New
              </Chakra.Tag>
            </Chakra.Stack>
            <Chakra.Link href={"#"}>Tutorials</Chakra.Link>
            <Chakra.Link href={"#"}>Pricing</Chakra.Link>
            <Chakra.Link href={"#"}>Releases</Chakra.Link>
          </Chakra.Stack>
          <Chakra.Stack align={"flex-start"}>
            {/* <Chakra.ListHeader>Company</Chakra.ListHeader> */}
            <Chakra.Link href={"#"}>About Us</Chakra.Link>
            <Chakra.Link href={"#"}>Press</Chakra.Link>
            <Chakra.Link href={"#"}>Careers</Chakra.Link>
            <Chakra.Link href={"#"}>Contact Us</Chakra.Link>
            <Chakra.Link href={"#"}>Partners</Chakra.Link>
          </Chakra.Stack>
          <Chakra.Stack align={"flex-start"}>
            {/* <Chakra.ListHeader>Legal</Chakra.ListHeader> */}
            <Chakra.Link href={"#"}>Cookies Policy</Chakra.Link>
            <Chakra.Link href={"#"}>Privacy Policy</Chakra.Link>
            <Chakra.Link href={"#"}>Terms of Service</Chakra.Link>
            <Chakra.Link href={"#"}>Law Enforcement</Chakra.Link>
            <Chakra.Link href={"#"}>Status</Chakra.Link>
          </Chakra.Stack>
          <Chakra.Stack align={"flex-start"}>
            {/* <Chakra.ListHeader>Follow Us</Chakra.ListHeader> */}
            <Chakra.Link href={"#"}>Facebook</Chakra.Link>
            <Chakra.Link href={"#"}>Twitter</Chakra.Link>
            <Chakra.Link href={"#"}>Dribbble</Chakra.Link>
            <Chakra.Link href={"#"}>Instagram</Chakra.Link>
            <Chakra.Link href={"#"}>LinkedIn</Chakra.Link>
          </Chakra.Stack>
        </Chakra.SimpleGrid>
      </Chakra.Container>
      <Chakra.Box py={10}>
        <Chakra.Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: Chakra.useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: Chakra.useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Chakra.Text as="h1" fontSize={"2xl"} fontWeight={"500"}>
            CHEFLY
          </Chakra.Text>
        </Chakra.Flex>
        <Chakra.Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2022 Chefly. All rights reserved
        </Chakra.Text>
        <Chakra.Text pt={1} fontSize={"sm"} textAlign={"center"}>
          Design And Developed By Polin Khan
        </Chakra.Text>
      </Chakra.Box>
    </Chakra.Box>
  );
}
