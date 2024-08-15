import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
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
      <Flex>
        <PlayerDataEntry />
      </Flex>

      {/* <Box width="100%" height="350px" /> */}

      <Footer />
    </div>
  );

  // interface StatbotData {
  //   image: string;
  //   player: string;
  //   week: number;
  //   season: string;
  //   season_type: string;
  //   team: string;
  //   position: string;
  //   opponent: string;
  //   dakota: string;
  //   fantasy_points: string;
  //   fantasy_points_ppr: string;
  //   passing: {
  //     // "2pt_conversions": string;
  //     completions: string;
  //     attempts: string;
  //     yards: string;
  //     touchdowns: string;
  //     sacks: string;
  //     sack_yards: string;
  //   };
  //   rushing: {
  //     // "2pt_conversions": string;
  //     carries: string;
  //     yards: string;
  //     touchdowns: string;
  //     rushing_first_downs: string;
  //     rushing_epa: string;
  //   };
  //   receiving: {
  //     // "2pt_conversions": string;
  //     receptions: string;
  //     targets: string;
  //     yards: string;
  //     yards_after_catch: string;
  //     touchdowns: string;
  //     target_share: string;
  //     receiving_air_yards: string;
  //     receiving_first_downs: string;
  //     receiving_epa: string;
  //     racr: string;
  //     air_yards_share: string;
  //     wopr: string;
  //   };
  //   turnovers: {
  //     fumbles: string;
  //     fumbles_lost: string;
  //     interceptions: string;
  //   };
  //   special_teams: {
  //     touchdowns: string;
  //   };
  // }

  // const [playerName, setPlayerName] = useState<string>("");
  // const [week, setWeek] = useState<string>("");
  // const [season, setSeason] = useState<string>("");
  // const [statName, setStatName] = useState<string>("recap");
  // const [columns, setColumns] = useState<string[]>([]);
  // const [data, setData] = useState<StatbotData | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  // const years = Array.from(
  //   new Array(26),
  //   (_, index) => new Date().getFullYear() - index
  // );

  // useEffect(() => {
  //   const fetchColumns = async () => {
  //     try {
  //       const response = await axios.get<string[]>(
  //         "http://127.0.0.1:5000/columns"
  //       );
  //       setColumns(["recap", ...response.data]);
  //     } catch (err) {
  //       console.error("Failed to fetch columns", err);
  //     }
  //   };

  //   fetchColumns();
  // }, []);

  // const fetchData = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.post<StatbotData>(
  //       "http://127.0.0.1:5000/statbot",
  //       {
  //         args: [playerName, week, statName, season],
  //       }
  //     );
  //     setData(response.data);
  //   } catch (err) {
  //     setError("Failed to fetch data.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // return (
  //   <div>
  //     <Box
  //       width="100%"
  //       height="0px"
  //       bg={useColorModeValue("white", "gray.800")}
  //       color={useColorModeValue("gray.800", "white")}
  //     />
  //     <AppBar />
  //     <Box p={5} maxW="500px" mx="auto">
  //       {/* <Heading as="h1" mb={4}>
  //         Statbot Data
  //       </Heading> */}
  //       <Box mb={4}>
  //         <Text mb={2}>Player Name:</Text>
  //         <Input
  //           placeholder="Enter player name"
  //           value={playerName}
  //           onChange={(e) => setPlayerName(e.target.value)}
  //         />
  //       </Box>
  //       <Box mb={4}>
  //         <Text mb={2}>Week:</Text>
  //         <Input
  //           placeholder="Enter week number"
  //           value={week}
  //           onChange={(e) => setWeek(e.target.value)}
  //         />
  //       </Box>
  //       <Box mb={4}>
  //         <Text mb={2}>Season:</Text>
  //         <Select
  //           placeholder="Select year"
  //           value={season}
  //           onChange={(e) => setSeason(e.target.value)}
  //         >
  //           {years.map((year) => (
  //             <option key={year} value={year}>
  //               {year}
  //             </option>
  //           ))}
  //         </Select>
  //       </Box>
  //       <Box mb={4}>
  //         <Text mb={2}>Stat Name:</Text>
  //         <Select
  //           placeholder="Select stat"
  //           value={statName}
  //           onChange={(e) => setStatName(e.target.value)}
  //         >
  //           {columns.map((column) => (
  //             <option key={column} value={column}>
  //               {column}
  //             </option>
  //           ))}
  //         </Select>
  //       </Box>
  //       <Button colorScheme="blue" onClick={fetchData} isLoading={loading}>
  //         Fetch Data
  //       </Button>

  //       {loading && <Text mt={4}>Loading...</Text>}
  //       {error && (
  //         <Text mt={4} color="red.500">
  //           {error}
  //         </Text>
  //       )}
  //       {data && (
  //         <Box mt={4}>
  //           <PlayerStatsCard stats={data} />
  //         </Box>
  //       )}
  //     </Box>
  //     <Footer />
  //   </div>
  // );
}

export default App;
