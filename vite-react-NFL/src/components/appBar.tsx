import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Link,
  useColorMode,
  useColorModeValue,
  Button,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaDiscord } from "react-icons/fa";

function AppBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const expandedBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    const handleScroll = () => {
      setIsExpanded(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      width="100%"
      zIndex="1"
      bg={isExpanded ? expandedBgColor : bgColor}
      color={textColor}
      transition="background-color 0.3s"
    >
      <Flex width="100%" as="nav" padding="1.5rem">
        <Heading as="h1" size="lg" letterSpacing={"tighter"} marginRight="auto">
          StatBot
        </Heading>
        <Box width="800px"></Box>
        <Flex>
          <Link
            href="https://discord.com/oauth2/authorize?client_id=1159784834458206278"
            isExternal
            marginRight={4}
            _hover={{ textDecoration: "none" }}
          >
            <Icon as={FaDiscord} w={10} h={10} />
          </Link>
          <Button onClick={toggleColorMode} marginLeft="auto">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default AppBar;
