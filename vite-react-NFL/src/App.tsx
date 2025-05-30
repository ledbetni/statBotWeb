import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import AppBar from "./components/appBar";
import Footer from "./components/footer";
import Navbar from "./components/navBar";
import "./App.css";
import PlayerDataEntry from "./components/playerDataEntry";
import Home from "./pages/home";
import WeeklyStats from "./pages/weeklyStats";
import { ChakraProvider } from "@chakra-ui/react";

// function App() {
//   return (
//     <div>
//       <AppBar />
//       <Navbar />
//       <Box width="100%" height="30px" />
//       <Flex>
//         <PlayerDataEntry />
//       </Flex>

//       {/* <Box width="100%" height="350px" /> */}

//       <Footer />
//     </div>
//   );
// }

// export default App;

function App() {
  // return (
  //   <div>
  //     <AppBar />
  //     <Navbar />
  //     <Box width="100%" height="30px" />
  //     <Flex>
  //       <PlayerDataEntry />
  //     </Flex>

  //     {/* <Box width="100%" height="350px" /> */}

  //     <Footer />
  //   </div>
  // );
  return (
    <>
      <AppBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<WeeklyStats />} />
        <Route path="/weekly" element={<WeeklyStats />} />
        <Route path="/season-rankings" element={<WeeklyStats />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
