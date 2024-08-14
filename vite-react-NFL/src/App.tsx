import { Box, Text } from "@chakra-ui/react";
import ProjectPage from "./pages/projects";
import AboutPage from "./pages/about";
import ProjectCard from "./components/projectCard";
import CircularImage from "./components/circularImage";
import AppBar from "./components/appBar";
import Footer from "./components/footer";
import "./App.css";
import PlayerDataEntry from "./components/playerDataEntry";
import PlayerStatsCard from "./components/playerStatsCard";

function App() {
  return (
    <div>
      <AppBar />
      <Box width="100%" height="30px" />

      <PlayerDataEntry />

      <Footer />
    </div>
  );
}

export default App;
