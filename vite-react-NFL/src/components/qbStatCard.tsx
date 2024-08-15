import React from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Divider,
  Flex,
} from "@chakra-ui/react";
import DynamicTooltip from "./dynamicToolTip";

interface QBStats {
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

interface QBStatsProps {
  stats: QBStats;
}

const QBStatsCard: React.FC<QBStatsProps> = ({ stats }) => {
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
      <VStack spacing={4} align="stretch">
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

        {stats.passing &&
          (stats.passing.attempts !== "0" ||
            stats.passing.completions !== "0" ||
            stats.passing.yards !== "0.0" ||
            stats.passing.touchdowns !== "0" ||
            stats.passing.sacks !== "0.0" ||
            stats.passing.sack_yards !== "0.0" ||
            stats.passing.passing_air_yards !== "0.0" ||
            stats.passing.passing_yards_after_catch !== "0.0" ||
            stats.passing.passing_first_downs !== "0.0" ||
            stats.passing.passing_epa !== "NaN" ||
            stats.passing.pacr !== "NaN") && (
            <VStack align="start">
              <Text fontWeight="bold">Passing:</Text>
              {stats.passing.completions !== "0" &&
                stats.passing.completions != null && (
                  <Text>Completions: {stats.passing.completions}</Text>
                )}
              {stats.passing.attempts !== "0" &&
                stats.passing.attempts != null && (
                  <Text>Attempts: {stats.passing.attempts}</Text>
                )}
              {stats.passing.yards !== "0.0" && stats.passing.yards != null && (
                <Text>Yards: {stats.passing.yards}</Text>
              )}
              {stats.passing.touchdowns !== "0" &&
                stats.passing.touchdowns != null && (
                  <Text>Touchdowns: {stats.passing.touchdowns}</Text>
                )}
              {stats.passing.sacks !== "0.0" && stats.passing.sacks != null && (
                <Text>Sacks Taken: {stats.passing.sacks}</Text>
              )}
              {stats.passing.sack_yards !== "0.0" &&
                stats.passing.sack_yards != null && (
                  <Text>Sack Yards Taken: {stats.passing.sack_yards}</Text>
                )}
              {stats.passing.passing_air_yards !== "0.0" &&
                stats.passing.passing_air_yards != null && (
                  <Text>
                    Passing Air Yards: {stats.passing.passing_air_yards}
                  </Text>
                )}
              {stats.passing.passing_yards_after_catch !== "0.0" &&
                stats.passing.passing_yards_after_catch != null && (
                  <Text>
                    Passing Yards After Catch:{" "}
                    {stats.passing.passing_yards_after_catch}
                  </Text>
                )}
              {stats.passing.passing_first_downs !== "0.0" &&
                stats.passing.passing_first_downs != null && (
                  <Text>
                    Passing First Downs: {stats.passing.passing_first_downs}
                  </Text>
                )}
              {stats.passing.passing_epa !== "NaN" &&
                stats.passing.passing_epa != null && (
                  <Text>Passing EPA: {stats.passing.passing_epa}</Text>
                )}
              {stats.passing.pacr !== "NaN" && stats.passing.pacr != null && (
                <Flex>
                  <DynamicTooltip message="Passing Air Conversion Ratio. PACR = Passing Yards / Air Yards" />
                  <Text>PACR: {stats.passing.pacr}</Text>
                </Flex>
              )}
            </VStack>
          )}
        <Divider />
        {stats.rushing &&
          (stats.rushing.carries !== "0" ||
            stats.rushing.yards !== "0.0" ||
            stats.rushing.touchdowns !== "0" ||
            stats.rushing.rushing_first_downs !== "0.0" ||
            stats.rushing.rushing_epa !== "NaN") && (
            <VStack align="start">
              <Text fontWeight="bold">Rushing:</Text>
              {stats.rushing.carries !== "0" && (
                <Text>Carries: {stats.rushing.carries}</Text>
              )}
              {stats.rushing.yards !== "0.0" && (
                <Text>Yards: {stats.rushing.yards}</Text>
              )}
              {stats.rushing.touchdowns !== "0" && (
                <Text>Touchdowns: {stats.rushing.touchdowns}</Text>
              )}
              {stats.rushing.rushing_first_downs !== "0.0" && (
                <Text>
                  Rushing First Downs: {stats.rushing.rushing_first_downs}
                </Text>
              )}
              {stats.rushing.rushing_epa !== "NaN" && (
                <Flex>
                  <DynamicTooltip message="Expected Points Added: measures how well a player performs compared to their expectation" />
                  <Text>Rushing EPA: {stats.rushing.rushing_epa}</Text>
                </Flex>
              )}
            </VStack>
          )}

        {stats.rushing?.carries != "0" && <Divider />}

        {stats.receiving &&
          ((stats.receiving.receptions != null &&
            stats.receiving.receptions !== "nan" &&
            stats.receiving.receptions !== "NaN") ||
            (stats.receiving.targets != null &&
              stats.receiving.targets !== "nan" &&
              stats.receiving.targets !== "NaN") ||
            (stats.receiving.yards != null &&
              stats.receiving.yards !== "nan" &&
              stats.receiving.yards !== "NaN") ||
            (stats.receiving.yards_after_catch != null &&
              stats.receiving.yards_after_catch !== "nan" &&
              stats.receiving.yards_after_catch !== "NaN") ||
            (stats.receiving.touchdowns != null &&
              stats.receiving.touchdowns !== "nan" &&
              stats.receiving.touchdowns !== "NaN") ||
            (stats.receiving.target_share != null &&
              stats.receiving.target_share !== "nan" &&
              stats.receiving.target_share !== "NaN") ||
            (stats.receiving.receiving_air_yards != null &&
              stats.receiving.receiving_air_yards !== "nan" &&
              stats.receiving.receiving_air_yards !== "NaN") ||
            (stats.receiving.air_yards_share != null &&
              stats.receiving.air_yards_share !== "nan" &&
              stats.receiving.air_yards_share !== "NaN") ||
            (stats.receiving.receiving_first_downs != null &&
              stats.receiving.receiving_first_downs !== "nan" &&
              stats.receiving.receiving_first_downs !== "NaN") ||
            (stats.receiving.receiving_epa != null &&
              stats.receiving.receiving_epa !== "nan" &&
              stats.receiving.receiving_epa !== "NaN") ||
            (stats.receiving.racr != null &&
              stats.receiving.racr !== "nan" &&
              stats.receiving.racr !== "NaN") ||
            (stats.receiving.wopr != null &&
              stats.receiving.wopr !== "nan" &&
              stats.receiving.wopr !== "NaN")) && (
            <VStack align="start">
              {stats.receiving.receptions != null &&
                stats.receiving.receptions !== "nan" &&
                stats.receiving.receptions !== "NaN" && (
                  <Text fontWeight="bold">Receiving:</Text>
                )}
              {stats.receiving.receptions != null &&
                stats.receiving.receptions !== "nan" &&
                stats.receiving.receptions !== "NaN" && (
                  <Text>Receptions: {stats.receiving.receptions}</Text>
                )}
              {stats.receiving.targets != null &&
                stats.receiving.targets !== "nan" &&
                stats.receiving.targets !== "NaN" && (
                  <Text>Targets: {stats.receiving.targets}</Text>
                )}
              {stats.receiving.yards != null &&
                stats.receiving.yards !== "nan" &&
                stats.receiving.yards !== "NaN" && (
                  <Text>Yards: {stats.receiving.yards}</Text>
                )}
              {stats.receiving.yards_after_catch != null &&
                stats.receiving.yards_after_catch !== "nan" &&
                stats.receiving.yards_after_catch !== "NaN" && (
                  <Text>
                    Yards After Catch: {stats.receiving.yards_after_catch}
                  </Text>
                )}
              {stats.receiving.touchdowns != null &&
                stats.receiving.touchdowns !== "nan" &&
                stats.receiving.touchdowns !== "NaN" && (
                  <Text>Touchdowns: {stats.receiving.touchdowns}</Text>
                )}
              {stats.receiving.target_share != null &&
                stats.receiving.target_share !== "nan" &&
                stats.receiving.target_share !== "NaN" && (
                  <Text>Target Share: {stats.receiving.target_share}</Text>
                )}
              {stats.receiving.receiving_air_yards != null &&
                stats.receiving.receiving_air_yards !== "nan" &&
                stats.receiving.receiving_air_yards !== "NaN" && (
                  <Text>Air Yards: {stats.receiving.receiving_air_yards}</Text>
                )}
              {stats.receiving.air_yards_share != null &&
                stats.receiving.air_yards_share !== "nan" &&
                stats.receiving.air_yards_share !== "NaN" && (
                  <Text>
                    Air Yards Share: {stats.receiving.air_yards_share}
                  </Text>
                )}
              {stats.receiving.receiving_first_downs != null &&
                stats.receiving.receiving_first_downs !== "nan" &&
                stats.receiving.receiving_first_downs !== "NaN" && (
                  <Text>
                    First Downs: {stats.receiving.receiving_first_downs}
                  </Text>
                )}
              {stats.receiving.receiving_epa != null &&
                stats.receiving.receiving_epa !== "nan" &&
                stats.receiving.receiving_epa !== "NaN" && (
                  <Flex>
                    <DynamicTooltip message="Expected Points Added: measures how well a player performs compared to their expectation" />
                    <Text>Receiving EPA: {stats.receiving.receiving_epa}</Text>
                  </Flex>
                )}
              {stats.receiving.racr != null &&
                stats.receiving.racr !== "nan" &&
                stats.receiving.racr !== "NaN" && (
                  <Flex>
                    <DynamicTooltip message="Ratio of receiving yards divided by total air yards" />
                    <Text>RACR: {stats.receiving.racr}</Text>
                  </Flex>
                )}
              {stats.receiving.wopr != null &&
                stats.receiving.wopr !== "nan" &&
                stats.receiving.wopr !== "NaN" && (
                  <Flex>
                    <DynamicTooltip message="Weighted combination of Target Share and Air Yard Share. WOPR = 1.5 x Target Share + 0.7 x Air Yard Share" />
                    <Text>WOPR: {stats.receiving.wopr}</Text>
                  </Flex>
                )}
            </VStack>
          )}

        {stats.receiving?.receptions != null && <Divider />}

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

export default QBStatsCard;
