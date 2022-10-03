import { Chakra, icons, Contexts } from "../AllComponents";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { isOpen, onToggle } = Chakra.useDisclosure();
  const { logout, fullDB, currentUser } = Contexts.useFirebaseContext();
  const myDB = fullDB[currentUser.uid];
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
      bg: Chakra.useColorModeValue("white", "gray.800"),
      color: Chakra.useColorModeValue("gray.600", "white"),
      minH: "60px",
      py: { base: 2 },
      px: { base: 4 },
      borderBottom: 1,
      borderStyle: "solid",
      borderColor: Chakra.useColorModeValue("gray.200", "gray.900"),
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
      textAlign: Chakra.useBreakpointValue({ base: "center", md: "left" }),
      fontFamily: "heading",
      color: Chakra.useColorModeValue("gray.800", "white"),
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
      as: Chakra.Button,
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
    fullDB[currentUser.uid] && (
      <Chakra.Box {...NavbarCSS[0]}>
        <Chakra.Flex {...NavbarCSS[1]}>
          <Chakra.Flex {...NavbarCSS[2]}>
            <Chakra.IconButton
              {...NavbarCSS[3]}
              onClick={onToggle}
              icon={isOpen ? <icons.IoClose /> : <icons.IoMenu />}
            />
          </Chakra.Flex>
          <Chakra.Flex {...NavbarCSS[4]}>
            <Chakra.Center>
              <Link to="/">
                <Chakra.Text {...NavbarCSS[5]}>CHAFLY</Chakra.Text>
              </Link>
            </Chakra.Center>

            <Chakra.Flex {...NavbarCSS[6]}>
              <DesktopNav />
            </Chakra.Flex>
          </Chakra.Flex>

          <Chakra.Stack {...NavbarCSS[7]}>
            <Chakra.Menu>
              <Chakra.MenuButton {...NavbarCSS[8]}>
                <Chakra.Avatar size={"sm"} src={myDB.photoURL} />
              </Chakra.MenuButton>
              <Chakra.MenuList alignItems={"center"}>
                <br />
                <Chakra.Center>
                  <Chakra.Avatar size={"2xl"} src={myDB.photoURL} />
                </Chakra.Center>
                <br />
                <Chakra.Center>
                  <Chakra.Text>{myDB.displayName}</Chakra.Text>
                </Chakra.Center>
                <br />
                <Chakra.MenuDivider />
                <Chakra.MenuItem>My Profile</Chakra.MenuItem>
                <Link to="/account">
                  <Chakra.MenuItem>Account Settings</Chakra.MenuItem>
                </Link>
                <Chakra.MenuItem onClick={() => logout()}>
                  Log Out
                </Chakra.MenuItem>
              </Chakra.MenuList>
            </Chakra.Menu>
          </Chakra.Stack>
        </Chakra.Flex>

        <Chakra.Collapse in={isOpen} animateOpacity>
          <MobileNav onToggle={onToggle} />
        </Chakra.Collapse>
      </Chakra.Box>
    )
  );
}

const DesktopNav = () => {
  const popoverContentBgColor = Chakra.useColorModeValue("white", "gray.800");

  return (
    <Chakra.Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Chakra.Box key={navItem.label}>
          <Chakra.Popover trigger={"hover"} placement={"bottom-start"}>
            <Chakra.PopoverTrigger>
              <Chakra.Center p={2} h={"100%"} cursor={"pointer"}>
                <Chakra.Text>{navItem.label}</Chakra.Text>
              </Chakra.Center>
            </Chakra.PopoverTrigger>

            {navItem.children && (
              <Chakra.PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Chakra.Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Chakra.Stack>
              </Chakra.PopoverContent>
            )}
          </Chakra.Popover>
        </Chakra.Box>
      ))}
    </Chakra.Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link to={href}>
      <Chakra.HStack align={"center"} role={"group"} rounded={"md"}>
        <Chakra.Box w={"100%"} p={2}>
          <Chakra.Text
            transition={"all .3s ease"}
            _groupHover={{ color: "teal.400" }}
            fontWeight={500}
          >
            {label}
          </Chakra.Text>
          <Chakra.Text fontSize={"sm"}>{subLabel}</Chakra.Text>
        </Chakra.Box>
        <Chakra.Center
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Chakra.Icon
            color={"teal.400"}
            w={5}
            h={"100%"}
            as={icons.IoChevronForward}
          />
        </Chakra.Center>
      </Chakra.HStack>
    </Link>
  );
};

const MobileNav = ({ onToggle }) => {
  return (
    <Chakra.Stack
      bg={Chakra.useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          onMainToggle={onToggle}
        />
      ))}
    </Chakra.Stack>
  );
};

const MobileNavItem = ({ label, children, onMainToggle }) => {
  const { isOpen, onToggle } = Chakra.useDisclosure();

  return (
    <Chakra.Stack spacing={4} onClick={children && onToggle}>
      <Chakra.Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        cursor={"pointer"}
      >
        <Chakra.Text
          fontWeight={600}
          color={Chakra.useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Chakra.Text>
        {children && (
          <Chakra.Icon
            as={icons.IoChevronDown}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Chakra.Flex>

      <Chakra.Collapse
        in={isOpen}
        animateOpacity
        style={{ marginTop: "0!important" }}
      >
        <Chakra.Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={Chakra.useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                to={child.href}
                onClick={onMainToggle}
              >
                {child.label}
              </Link>
            ))}
        </Chakra.Stack>
      </Chakra.Collapse>
    </Chakra.Stack>
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
