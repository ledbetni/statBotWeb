import {
  Box,
  Container,
  Text,
  Stack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
function Footer() {
  const textColor = useColorModeValue("gray.800", "white");
  // function scrollToTop() {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }
  // const scrollToProjects = () => {
  //   const projectsSection = document.getElementById("projects");
  //   if (projectsSection) {
  //     projectsSection.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      right="0"
      // bg={isExpanded ? expandedBgColor : bgColor}
      bg="transparent"
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
