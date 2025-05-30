import PlayerDataEntry from "../components/playerDataEntry";
import { Box, Flex } from "@chakra-ui/react";

export default function WeeklyStats() {
  return (
    <div>
      {/* <Navbar /> */}
      <Box width="100%" height="30px" />
      <Flex>
        <PlayerDataEntry />
      </Flex>

      {/* <Box width="100%" height="350px" /> */}

      {/* <Footer /> */}
    </div>
  );
}
