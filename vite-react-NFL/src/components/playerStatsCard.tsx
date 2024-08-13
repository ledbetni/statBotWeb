import React from "react";
import { Box, Image, Text, VStack, HStack, Divider } from "@chakra-ui/react";

interface PlayerStats {
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

interface PlayerStatsProps {
  stats: PlayerStats;
}

const PlayerStatsCard: React.FC<PlayerStatsProps> = ({ stats }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      maxW="sm"
      mx="auto"
    >
      <VStack spacing={4}>
        <Image borderRadius="md" src={stats.image} alt={stats.player} />

        <Text fontSize="xl" fontWeight="bold">
          {stats.player} - {stats.position}
        </Text>
        <Text fontSize="md" color="gray.600">
          {stats.team} vs {stats.opponent}, Week {stats.week}, {stats.season}
        </Text>

        <Divider />

        <HStack spacing={4} width="100%">
          <VStack align="start">
            <Text fontWeight="bold">Passing:</Text>
            <Text>Attempts: {stats.passing.attempts}</Text>
            <Text>Completions: {stats.passing.completions}</Text>
            <Text>Yards: {stats.passing.yards}</Text>
            <Text>Touchdowns: {stats.passing.touchdowns}</Text>
            <Text>Sacks: {stats.passing.sacks}</Text>
          </VStack>

          <VStack align="start">
            <Text fontWeight="bold">Rushing:</Text>
            <Text>Carries: {stats.rushing.carries}</Text>
            <Text>Yards: {stats.rushing.yards}</Text>
            <Text>Touchdowns: {stats.rushing.touchdowns}</Text>
          </VStack>
        </HStack>

        <Divider />

        <VStack align="start" width="100%">
          <Text fontWeight="bold">Receiving:</Text>
          <Text>Receptions: {stats.receiving.receptions}</Text>
          <Text>Yards: {stats.receiving.yards}</Text>
          <Text>Touchdowns: {stats.receiving.touchdowns}</Text>
        </VStack>

        <Divider />

        <VStack align="start" width="100%">
          <Text fontWeight="bold">Turnovers:</Text>
          <Text>Interceptions: {stats.turnovers.interceptions}</Text>
          <Text>Fumbles: {stats.turnovers.fumbles}</Text>
          <Text>Fumbles Lost: {stats.turnovers.fumbles_lost}</Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PlayerStatsCard;
