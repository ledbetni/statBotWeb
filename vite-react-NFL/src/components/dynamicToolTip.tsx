import { Box, Tooltip, IconButton } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

interface DynamicTooltipProps {
  message: string;
}

function DynamicTooltip({ message }: DynamicTooltipProps) {
  return (
    <Tooltip
      label={
        <Box
          p={2}
          bg="gray.700"
          color="white"
          borderRadius="md"
          minWidth="150px"
        >
          {message}
        </Box>
      }
      hasArrow
      bg="transparent"
    >
      <IconButton
        aria-label="Info"
        icon={<InfoIcon />}
        size="sm"
        borderRadius="full"
        variant="ghost"
        _hover={{ bg: "gray.500" }}
      />
    </Tooltip>
  );
}

export default DynamicTooltip;
