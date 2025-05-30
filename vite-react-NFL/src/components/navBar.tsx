import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box bg="gray.800" px={4} py={2}>
      <Flex align="center">
        <Link to="/weekly">
          <Button colorScheme="teal" variant="ghost">
            Weekly Player Stats
          </Button>
        </Link>
        {/* <Link to="/season-rankings">
          <Button colorScheme="teal" variant="ghost">
            Seasonal Rankings
          </Button>
        </Link> */}
      </Flex>
    </Box>
  );
}
