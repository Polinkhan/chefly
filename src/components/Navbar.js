import { Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Popover, PopoverTrigger, PopoverContent, useColorModeValue, useBreakpointValue, useDisclosure, Menu, MenuButton, Avatar, MenuList, Center, MenuDivider, MenuItem, HStack, VStack } from "@chakra-ui/react";
import { IoMenu, IoClose, IoChevronDown, IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useFirebaseContext } from "../contexts/FirebaseContext";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { logout, myDB } = useFirebaseContext();
  console.warn = () => {};

  //Navbar css files
  const NavbarCSS = [
    {
      //CSS_0
      position: "sticky",
      top: "0",
      zIndex: 999999,
    },
    {
      //CSS_1
      bg: useColorModeValue("white", "gray.800"),
      color: useColorModeValue("gray.600", "white"),
      minH: "60px",
      py: { base: 2 },
      px: { base: 4 },
      borderBottom: 1,
      borderStyle: "solid",
      borderColor: useColorModeValue("gray.200", "gray.900"),
      align: "center",
    },
    {
      //CSS_2
      flex: { base: 1, md: "auto" },
      ml: { base: -2 },
      display: { base: "flex", md: "none" },
    },
    {
      //CSS_3
      size: "lg",
      variant: "ghost",
      "aria-label": "Toggle Navigation",
    },
    {
      //CSS_4
      flex: { base: 1 },
      justify: { base: "center", md: "start" },
    },
    {
      //CSS_5
      textAlign: useBreakpointValue({ base: "center", md: "left" }),
      fontFamily: "heading",
      color: useColorModeValue("gray.800", "white"),
      fontWeight: "500",
      fontSize: "xl",
    },
    {
      //CSS_6
      display: { base: "none", md: "flex" },
      ml: 10,
    },
    {
      //CSS_7
      flex: { base: 1, md: 0 },
      justify: "flex-end",
      direction: "row",
      spacing: 6,
    },
    {
      //CSS_8
      as: Button,
      rounded: "full",
      variant: "link",
      cursor: "pointer",
      minW: 0,
    },
    {
      //CSS_9
    },
    {
      //CSS_10
    },
  ];

  return (
    <Box {...NavbarCSS[0]}>
      <Flex {...NavbarCSS[1]}>
        <Flex {...NavbarCSS[2]}>
          <IconButton {...NavbarCSS[3]} onClick={onToggle} icon={isOpen ? <IoClose /> : <IoMenu />} />
        </Flex>
        <Flex {...NavbarCSS[4]}>
          <Center>
            <Link to="/">
              <Text {...NavbarCSS[5]}>CHAFLY</Text>
            </Link>
          </Center>

          <Flex {...NavbarCSS[6]}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack {...NavbarCSS[7]}>
          <Menu>
            <MenuButton {...NavbarCSS[8]}>
              <Avatar size={"sm"} src={myDB.photoURL} />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar size={"2xl"} src={myDB.photoURL} />
              </Center>
              <br />
              <Center>
                <Text>{myDB.displayName}</Text>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>My Profile</MenuItem>
              <Link to="/account">
                <MenuItem>Account Settings</MenuItem>
              </Link>
              <MenuItem onClick={() => logout()}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav onToggle={onToggle} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Center p={2} h={"100%"} cursor={"pointer"}>
                <Text>{navItem.label}</Text>
              </Center>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow={"xl"} bg={popoverContentBgColor} p={4} rounded={"xl"} minW={"sm"}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link to={href}>
      <HStack align={"center"} role={"group"} rounded={"md"}>
        <Box w={"100%"} p={2}>
          <Text transition={"all .3s ease"} _groupHover={{ color: "teal.400" }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Center transition={"all .3s ease"} transform={"translateX(-10px)"} opacity={0} _groupHover={{ opacity: "100%", transform: "translateX(0)" }} justify={"flex-end"} align={"center"} flex={1}>
          <Icon color={"teal.400"} w={5} h={"100%"} as={IoChevronForward} />
        </Center>
      </HStack>
    </Link>
  );
};

const MobileNav = ({ onToggle }) => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} onMainToggle={onToggle} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, onMainToggle }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex py={2} justify={"space-between"} align={"center"} cursor={"pointer"}>
        <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
        {children && <Icon as={IoChevronDown} transition={"all .25s ease-in-out"} transform={isOpen ? "rotate(180deg)" : ""} w={6} h={6} />}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack mt={2} pl={4} borderLeft={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.700")} align={"start"}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} to={child.href} onClick={onMainToggle}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "News Feed",
    children: [
      {
        label: "Trending",
        subLabel: "Trending inspire you",
        href: "#",
      },
      {
        label: "New",
        subLabel: "Up-and-coming",
        href: "#",
      },
    ],
  },
  {
    label: "Friends",
    children: [
      {
        label: "Add Friends",
        subLabel: "Add your friend by id",
        href: "/addfriend",
      },
      {
        label: "Manage Friends",
        subLabel: "Manage your friend list",
        href: "/managefriend",
      },
    ],
  },
  {
    label: "Stories",
    href: "#",
  },
  {
    label: "Messenger",
    href: "#",
  },
];
