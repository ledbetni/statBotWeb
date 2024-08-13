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
      {/* <CircularImage
        src="../assets/selfie.jpg"
        alt="Nick Ledbetter"
        offsetY="-35px"
      /> */}
      {/* <Box width="100%" height="20px" />
      <Text fontSize="xl" fontWeight="bold" _hover={{ color: "green.500" }}>
        Hello, I'm Nick Ledbetter.
      </Text> */}

      <PlayerDataEntry />

      {/* <AboutPage />
      <Box width="100%" height="40px" />
      <Text fontSize="xl" fontWeight="bold" _hover={{ color: "green.500" }}>
        Professional Projects and Open Source
      </Text>
      <Box width="100%" height="20px" />
      <ProjectCard
        title="American Veterinary Medical Association App"
        description="This was my Senior Capstone Project at Oregon State University. I designed and developed a mobile application for the American Veterinary Medical Association. This was part of a comprehensive solution including a mobile app, full-stack web app, and database developed by my team over the course of a year. The mobile app was built using Flutter, and I also contributed to the React/Node.js web app as well as the PostgreSQL database."
      />
      <Box width="100%" height="20px" />
      <ProjectCard
        title="Flutter"
        description="I love the Flutter framework and Dart programming language, and I am starting to contribute in my spare time."
      />
      <Box width="100%" height="80px" id="projects" />

      <Text fontSize="xl" fontWeight="bold" _hover={{ color: "green.500" }}>
        My Projects
      </Text>
      <Box width="100%" height="10px" />
      <Text fontSize="lg">
        I love to create new things! Below you can find some of my favorite
        projects so far. I am always working on something new, so check back
        soon!
      </Text>
      <Box width="100%" height="10px" />
      <ProjectPage />
      <Box width="100%" height="100px" /> */}
      <Footer />
    </div>
  );
}

export default App;
