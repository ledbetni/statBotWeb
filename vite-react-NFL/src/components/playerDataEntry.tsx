import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";
import { Box, Button, Text, Select, Flex } from "@chakra-ui/react";
import QBStatsCard from "./qbStatCard";
import WRStatsCard from "./wrStatCard";
import RBStatsCard from "./rbStatCard";
import TEStatsCard from "./teStatCard";
import TaysomStatsCard from "./taysomStatCard";
import PlayerSearchBox from "./searchBar";

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
    carries: string;
    yards: string;
    touchdowns: string;
    first_downs: string;
    epa: string;
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

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 + 1 },
    (_, index) => currentYear - index
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

  axiosRetry(axios, { retries: 10 });

  const fetchData = async () => {
    console.log("fetchData function called");
    setLoading(true);
    setError(null);
    try {
      // const response = await axios.post<StatbotData>(
      //   "https://sslstatbot.com/weekly",
      //   {
      //     args: [playerName, week, statName, season],
      //   }
      // );
      const response = await axios.post<StatbotData>(
        "https://127.0.0.1/weekly",
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

  const getWeeksSinceWeekOne = () => {
    const weekOne = new Date("2024-09-08");
    const today = new Date();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;

    if (today < weekOne) {
      return 1;
    }
    const diffInMs = today.getTime() - weekOne.getTime();
    const weeksSince = Math.ceil(diffInMs / oneWeek);
    return Math.min(weeksSince, 18);
  };

  const getWeekOptions = () => {
    if (season == "2024") {
      const maxWeeks = getWeeksSinceWeekOne();
      return Array.from({ length: maxWeeks }, (_, i) => (i + 1).toString());
    } else {
      return Array.from({ length: 18 }, (_, i) => (i + 1).toString());
    }
  };

  return (
    <Box p={5} maxW="500px" mx="auto">
      <Box mb={4}>
        <Text fontWeight={"bold"} mb={2}>
          Player Name:
        </Text>

        <PlayerSearchBox onSelect={(name) => setPlayerName(name)} />
      </Box>
      <Flex fontWeight={"bold"} mb={4} gap={4}>
        <Box flex="1">
          <Text mb={2}>Week:</Text>
          <Select
            placeholder="Select"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          >
            {getWeekOptions().map((weekOption) => (
              <option key={weekOption} value={weekOption}>
                {weekOption}
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
    </Box>
  );
};

export default PlayerDataEntry;
