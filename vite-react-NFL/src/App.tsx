//import { BrowserRouter as Routes, Route } from "react-router-dom";
import "./App.css";
import WeeklyStats from "./pages/weeklyStats";
import AppBar from "./components/appBar";
import Navbar from "./components/navBar";

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
    // <>
    //   <Routes>
    //     <Route path="/" element={<WeeklyStats />} />
    //     <Route path="/weekly" element={<WeeklyStats />} />
    //     <Route path="/season-rankings" element={<WeeklyStats />} />
    //   </Routes>
    //   <Footer />
    // </>
    <>
      <AppBar />
      <Navbar />
      <WeeklyStats />
    </>
  );
}

export default App;
