import React from "react";
import { Box, Image, Text, VStack, HStack, Divider } from "@chakra-ui/react";

interface TEStats {
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
  passing: {
    // "2pt_conversions": string;
    completions: string;
    attempts: string;
    yards: string;
    touchdowns: string;
    sacks: string;
    sack_yards: string;
  };
  rushing: {
    // "2pt_conversions": string;
    carries: string;
    yards: string;
    touchdowns: string;
    rushing_first_downs: string;
    rushing_epa: string;
  };
  receiving: {
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
  turnovers: {
    fumbles: string;
    fumbles_lost: string;
    interceptions: string;
  };
  special_teams: {
    touchdowns: string;
  };
}

interface TEStatsProps {
  stats: TEStats;
}

const TEStatsCard: React.FC<TEStatsProps> = ({ stats }) => {
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

export default TEStatsCard;
