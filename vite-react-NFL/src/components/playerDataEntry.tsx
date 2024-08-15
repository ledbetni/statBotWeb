import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Input, Button, Text, Select, Flex } from "@chakra-ui/react";
import QBStatsCard from "./qbStatCard";
import WRStatsCard from "./wrStatCard";
import RBStatsCard from "./rbStatCard";
import TEStatsCard from "./teStatCard";
import TaysomStatsCard from "./taysomStatCard";

interface StatbotData {
  image: string;
  player: string;
  week: number;
  season: string;
  season_type: string;
  team: string;
  position: string;
  opponent: string;
  dakota: string;
  fantasy_points: string;
  fantasy_points_ppr: string;
  passing?: {
    // "2pt_conversions": string;
    completions: string;
    attempts: string;
    yards: string;
    touchdowns: string;
    sacks: string;
    sack_yards: string;
    passing_air_yards: string;
    passing_yards_after_catch: string;
    passing_first_downs: string;
    passing_epa: string;
    pacr: string;
  };
  rushing?: {
    // "2pt_conversions": string;
    carries: string;
    yards: string;
    touchdowns: string;
    rushing_first_downs: string;
    rushing_epa: string;
  };
  receiving?: {
    // "2pt_conversions": string;
    receptions: string;
    targets: string;
    yards: string;
    yards_after_catch: string;
    touchdowns: string;
    target_share: string;
    receiving_air_yards: string;
    receiving_first_downs: string;
    receiving_epa: string;
    racr: string;
    air_yards_share: string;
    wopr: string;
  };
  turnovers?: {
    fumbles: string;
    fumbles_lost: string;
    interceptions: string;
  };
  special_teams?: {
    touchdowns: string;
  };
}

const PlayerDataEntry: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [week, setWeek] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [statName, setStatName] = useState<string>("recap");
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<StatbotData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [boxLoad, setBoxLoad] = useState<boolean>(true);

  const years = Array.from(
    new Array(26),
    (_, index) => new Date().getFullYear() - index
  );

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        // const response = await axios.get<string[]>(
        //   "http://34.82.250.65:5000/columns"
        // );
        //setColumns(["recap", ...response.data]);
        setColumns(["recap"]);
      } catch (err) {
        console.error("Failed to fetch columns", err);
      }
    };

    fetchColumns();
  }, []);

  const fetchData = async () => {
    console.log("fetchData function called");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<StatbotData>(
        "http://34.82.250.65:5000/statbot",
        {
          args: [playerName, week, statName, season],
        }
      );
      setData(response.data);
      setBoxLoad(false);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const renderStatsCard = () => {
    if (!data)
      return (
        <div>
          <Text align={"center"}>No Player Data For This Week</Text>
          <Box height="100vh" />
        </div>
      );
    // return <PlayerStatsCard stats={data} />;

    if (data.player === "Taysom Hill") {
      return <TaysomStatsCard stats={data} />;
    } else {
      switch (data.position) {
        case "QB":
          return <QBStatsCard stats={data} />;
        case "WR":
          return <WRStatsCard stats={data} />;
        case "RB":
          return <RBStatsCard stats={data} />;
        case "TE":
          return <TEStatsCard stats={data} />;
        default:
          return (
            <div>
              <Text align={"center"}>No Player Data For This Week</Text>
              <Box height="100vh" />
            </div>
          );
      }
    }
  };

  return (
    <Box p={5} maxW="500px" mx="auto">
      {/* <Heading as="h1" mb={4}>
        Statbot Data
      </Heading> */}
      <Box mb={4}>
        <Text fontWeight={"bold"} mb={2}>
          Player Name:
        </Text>
        <Input
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          width="200px"
        />
      </Box>
      <Flex fontWeight={"bold"} mb={4} gap={4}>
        <Box flex="1">
          <Text mb={2}>Week:</Text>
          {/* <Input
            placeholder="Enter week number"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          /> */}
          <Select
            placeholder="Select"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          >
            {Array.from({ length: 18 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Select>
        </Box>
        <Box fontWeight={"bold"} flex="1">
          <Text mb={2}>Season:</Text>
          <Select
            placeholder="Select"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Box>
        <Box fontWeight={"bold"} flex="1">
          <Text mb={2}>Stat Name:</Text>
          <Select
            placeholder="Select stat"
            value={statName}
            onChange={(e) => setStatName(e.target.value)}
          >
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
      {/* <Box mb={4}>
        <Text mb={2}>Week:</Text>
        <Input
          placeholder="Enter week number"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
        />
      </Box>
      <Box mb={4}>
        <Text mb={2}>Season:</Text>
        <Select
          placeholder="Select year"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Box>
      <Box mb={4}>
        <Text mb={2}>Stat Name:</Text>
        <Select
          placeholder="Select stat"
          value={statName}
          onChange={(e) => setStatName(e.target.value)}
        >
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </Select>
      </Box> */}
      <Button colorScheme="blue" onClick={fetchData} isLoading={loading}>
        Fetch Data
      </Button>
      {boxLoad && (
        <Flex>
          <Box height="100vh" />
        </Flex>
      )}

      {loading && <Text mt={4}>Loading...</Text>}
      {error && (
        <Text mt={4} color="red.500">
          {error}
        </Text>
      )}
      {data && <Box mt={4}>{renderStatsCard()}</Box>}

      {/* {data && (
        <Box mt={4}>
          <PlayerStatsCard stats={data} />
        </Box>
      )} */}
    </Box>
  );
};

export default PlayerDataEntry;
