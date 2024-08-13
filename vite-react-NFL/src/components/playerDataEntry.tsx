import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Input, Button, Text, Heading, Select } from "@chakra-ui/react";
import PlayerStatsCard from "./playerStatsCard";

// interface StatbotData {
//   player: string;
//   week: number;
//   season: string;
//   statName: string;
//   [key: string]: any;
// }

interface StatbotData {
  image: string;
  opponent: string;
  passing: {
    "2pt_conversions": string;
    attempts: string;
    completions: string;
    sack_yards: string;
    sacks: string;
    touchdowns: string;
    yards: string;
  };
  player: string;
  position: string;
  receiving: {
    "2pt_conversions": string;
    receptions: string;
    target_share: string;
    targets: string;
    touchdowns: string;
    yards: string;
    yards_after_catch: string;
  };
  rushing: {
    "2pt_conversions": string;
    carries: string;
    touchdowns: string;
    yards: string;
  };
  season: string;
  special_teams: {
    touchdowns: string;
  };
  team: string;
  turnovers: {
    fumbles: string;
    fumbles_lost: string;
    interceptions: string;
  };
  week: number;
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

  const years = Array.from(
    new Array(26),
    (_, index) => new Date().getFullYear() - index
  );

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get<string[]>(
          "http://127.0.0.1:5000/columns"
        );
        setColumns(["recap", ...response.data]);
      } catch (err) {
        console.error("Failed to fetch columns", err);
      }
    };

    fetchColumns();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<StatbotData>(
        "http://127.0.0.1:5000/statbot",
        {
          args: [playerName, week, statName, season],
        }
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={5} maxW="500px" mx="auto">
      <Heading as="h1" mb={4}>
        Statbot Data
      </Heading>
      <Box mb={4}>
        <Text mb={2}>Player Name:</Text>
        <Input
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </Box>
      <Box mb={4}>
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
      </Box>
      <Button colorScheme="blue" onClick={fetchData} isLoading={loading}>
        Fetch Data
      </Button>
      {/* {loading && <Text mt={4}>Loading...</Text>}
      {error && (
        <Text mt={4} color="red.500">
          {error}
        </Text>
      )}
      {data && (
        <Box mt={4}>
          <Heading as="h2" size="md">
            Player: {playerName}
          </Heading>
          <Text>Week: {week}</Text>
          <Text>Season: {season}</Text>
          <Text>Stat Name: {statName}</Text>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Box>
      )}
    </Box> */}
      {loading && <Text mt={4}>Loading...</Text>}
      {error && (
        <Text mt={4} color="red.500">
          {error}
        </Text>
      )}
      {data && (
        <Box mt={4}>
          <PlayerStatsCard stats={data} />
        </Box>
      )}
    </Box>
  );
};

export default PlayerDataEntry;
