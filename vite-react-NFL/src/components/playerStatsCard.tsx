import React from "react";
import { Box, Image, Text, VStack, Divider, Flex } from "@chakra-ui/react";
import DynamicTooltip from "./dynamicToolTip";

interface PlayerStats {
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
    completions: string;
    attempts: string;
    yards: string;
    touchdowns: string;
    sacks: string;
    sack_yards: string;
    air_yards: string;
    yac: string;
    first_downs: string;
    epa: string;
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
    receptions: string;
    targets: string;
    yards: string;
    yac: string;
    touchdowns: string;
    target_share: string;
    air_yards: string;
    first_downs: string;
    epa: string;
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

interface PlayerStatsProps {
  stats: PlayerStats;
}

const PlayerStatsCard: React.FC<PlayerStatsProps> = ({ stats }) => {
  console.log("Rushing stats:", stats.rushing);
  const hasRushingData =
    stats.rushing &&
    (stats.rushing.carries !== "0" ||
      stats.rushing.yards !== "0.0" ||
      stats.rushing.touchdowns !== "0" ||
      stats.rushing.first_downs !== "0.0" ||
      stats.rushing.epa !== "NaN");

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
        <Flex>
          <DynamicTooltip message="Points vary depending on league settings" />
          <Text>Fantasy Points PPR: {stats.fantasy_points_ppr}</Text>
        </Flex>
        <Divider />

        {stats.passing && (
          <VStack align="start">
            <Text fontWeight="bold">Passing:</Text>
            {stats.passing.completions && (
              <Text>Completions: {stats.passing.completions}</Text>
            )}
            {stats.passing.attempts && (
              <Text>Attempts: {stats.passing.attempts}</Text>
            )}
            {stats.passing.yards && <Text>Yards: {stats.passing.yards}</Text>}
            {stats.passing.touchdowns && (
              <Text>Touchdowns: {stats.passing.touchdowns}</Text>
            )}
            {stats.passing.sacks && (
              <Text>Sacks Taken: {stats.passing.sacks}</Text>
            )}
            {stats.passing.sack_yards && (
              <Text>Sack Yards Taken: {stats.passing.sack_yards}</Text>
            )}
            {stats.passing.air_yards && (
              <Text>Passing Air Yards: {stats.passing.air_yards}</Text>
            )}
            {stats.passing.yac && (
              <Text>Passing Yards After Catch: {stats.passing.yac}</Text>
            )}
            {stats.passing.first_downs && (
              <Text>Passing First Downs: {stats.passing.first_downs}</Text>
            )}
            {stats.passing.epa && <Text>Passing EPA: {stats.passing.epa}</Text>}
            {stats.passing.pacr && (
              <Flex>
                <DynamicTooltip message="Passing Air Conversion Ratio. PACR = Passing Yards / Air Yards" />
                <Text>PACR: {stats.passing.pacr}</Text>
              </Flex>
            )}
          </VStack>
        )}

        {hasRushingData && (
          <VStack align="start">
            <Text fontWeight="bold">Rushing:</Text>
            {stats.rushing?.carries && (
              <Text>Carries: {stats.rushing.carries}</Text>
            )}
            {stats.rushing?.yards && <Text>Yards: {stats.rushing.yards}</Text>}
            {stats.rushing?.touchdowns && (
              <Text>Touchdowns: {stats.rushing.touchdowns}</Text>
            )}
            {stats.rushing?.first_downs && (
              <Text>First Downs: {stats.rushing.first_downs}</Text>
            )}
            {stats.rushing?.epa && (
              <Flex>
                <DynamicTooltip message="Expected Points Added: measures how well a player performs compared to their expectation" />
                <Text>EPA: {stats.rushing.epa}</Text>
              </Flex>
            )}
          </VStack>
        )}

        {stats.receiving && (
          <VStack align="start">
            <Text fontWeight="bold">Receiving:</Text>
            {stats.receiving.receptions && (
              <Text>Receptions: {stats.receiving.receptions}</Text>
            )}
            {stats.receiving.targets && (
              <Text>Targets: {stats.receiving.targets}</Text>
            )}
            {stats.receiving.yards && (
              <Text>Yards: {stats.receiving.yards}</Text>
            )}
            {stats.receiving.yac && (
              <Text>Yards After Catch: {stats.receiving.yac}</Text>
            )}
            {stats.receiving.touchdowns && (
              <Text>Touchdowns: {stats.receiving.touchdowns}</Text>
            )}
            {stats.receiving.target_share && (
              <Text>Target Share: {stats.receiving.target_share}</Text>
            )}
            {stats.receiving.air_yards && (
              <Text>Air Yards: {stats.receiving.air_yards}</Text>
            )}
            {stats.receiving.air_yards_share && (
              <Text>Air Yards Share: {stats.receiving.air_yards_share}</Text>
            )}
            {stats.receiving.first_downs && (
              <Text>First Downs: {stats.receiving.first_downs}</Text>
            )}
            {stats.receiving.epa && (
              <Flex>
                <DynamicTooltip message="Expected Points Added: measures how well a player performs compared to their expectation" />
                <Text>Receiving EPA: {stats.receiving.epa}</Text>
              </Flex>
            )}
            {stats.receiving.racr && (
              <Flex>
                <DynamicTooltip message="Ratio of receiving yards divided by total air yards" />
                <Text>RACR: {stats.receiving.racr}</Text>
              </Flex>
            )}
            {stats.receiving.wopr && (
              <Flex>
                <DynamicTooltip message="Weighted combination of Target Share and Air Yard Share. WOPR = 1.5 x Target Share + 0.7 x Air Yard Share" />
                <Text>WOPR: {stats.receiving.wopr}</Text>
              </Flex>
            )}
          </VStack>
        )}

        <Divider />

        <VStack align="start">
          <Text fontWeight="bold">Turnovers:</Text>
          <Text>Interceptions: {stats.turnovers?.interceptions}</Text>
          <Text>Fumbles: {stats.turnovers?.fumbles}</Text>
          <Text>Fumbles Lost: {stats.turnovers?.fumbles_lost}</Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PlayerStatsCard;
