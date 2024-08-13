import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

interface ProjectCardProps {
  title: string;
  description: string;
  githubLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  githubLink,
}) => {
  return (
    <Box
      borderWidth="2px"
      borderColor="gray.300"
      borderRadius="md"
      p="20px"
      m="10px"
      _hover={{ borderColor: "green.500" }}
    >
      <Text fontSize="xl" fontWeight="bold">
        {title}
      </Text>{" "}
      <Text mt="2">{description}</Text>
      {githubLink && (
        <Link
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          mt="2"
          color="blue.500"
          _hover={{ textDecor: "underline" }}
        >
          View on Github
        </Link>
      )}
    </Box>
  );
};

export default ProjectCard;

// return (
//   <div
//     style={{
//       border: "1px solid #ccc",
//       padding: "20px",
//       borderRadius: "8px",
//       margin: "10px",
//     }}
//   >
//     <p>{title}</p>
//     <p>{description}</p>
//     {githubLink && (
//       <a href={githubLink} target="_blank" rel="noopener noreferrer">
//         View on Github
//       </a>
//     )}
//   </div>
// );
