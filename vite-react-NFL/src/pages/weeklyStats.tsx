import PlayerDataEntry from "../components/playerDataEntry";
import { Box, Flex } from "@chakra-ui/react";
import AppBar from "../components/appBar";
import Footer from "../components/footer";
import Navbar from "../components/navBar";
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
