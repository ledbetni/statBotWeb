import { useState } from "react";
import {
  Box,
  Container,
  Text,
  Link,
  Stack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
function Footer() {
  const [isExpanded] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");
  const expandedBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      as="footer"
      bg={isExpanded ? expandedBgColor : bgColor}
      color={textColor}
      transition="background-color 0.3s"
      py="6"
      width="100%"
    >
      <Container maxW="container.lg">
        <HStack justify="space-between">
          <Stack>
            <Text>&copy; {new Date().getFullYear()} Nicholas Ledbetter</Text>
          </Stack>
        </HStack>
      </Container>
    </Box>
  );
}

export default Footer;
