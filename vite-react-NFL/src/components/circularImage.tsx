import React from "react";
import { Box, Image } from "@chakra-ui/react";

interface CircularImageProps {
  src: string;
  alt: string;
  size?: string | number;
  offsetX?: string | number;
  offsetY?: string | number;
}

const CircularImage: React.FC<CircularImageProps> = ({
  src,
  alt,
  size = "350px",
  offsetX = "0",
  offsetY = "0",
}) => {
  const objectPosition = `${offsetX} ${offsetY}`;

  return (
    <Box
      id="about"
      width={size}
      height={size}
      overflow="hidden"
      borderRadius="50%"
      display="inline-block"
      borderWidth="4px"
      borderColor="gray.800"
      _hover={{ borderColor: "green.500" }}
    >
      <Image
        src={src}
        alt={alt}
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition={objectPosition}
      />
    </Box>
  );
};

export default CircularImage;

{
}

{
  /* <Box
        as="img"
        src={src}
        alt={alt}
        width="100%"
        height="100%"
        objectFit="cover"
        position="absolute"
        top={offsetY}
        left={offsetX}
      /> */
}
