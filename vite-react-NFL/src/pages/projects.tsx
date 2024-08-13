import { Box } from "@chakra-ui/react";
import ProjectCard from "../components/projectCard";

const ProjectPage = () => {
  return (
    <div>
      <ProjectCard
        title="SafetyNet"
        description="SafetyNet is a mobile application that allows users to quickly send their location and a pre-crafted message to emergency contacts in the event of an emergency. I made this using Flutter, Firebase, Firestore, and Google Maps API."
        githubLink="https://github.com/ledbetni/SafetyNet"
      />
      <Box width="100%" height="20px" />
      <ProjectCard
        title="Statbot"
        description="Statbot is a Discord bot that provides NFL statistics to users. I am currently working on integrating machine learning to predict fantasy football player outcomes. Statbot was built using Python, with pandas dataframes for optimizing a large NFL dataset."
        githubLink="https://github.com/ledbetni/StatBot"
      />
      <Box width="100%" height="20px" />
      <ProjectCard
        title="Grokking Nick"
        description="The site you are looking at right now! I built this using React, Typescript, and Chakra UI components."
        githubLink="https://github.com/ledbetni/reactPortfolio"
      />
      <Box width="100%" height="20px" />
      <ProjectCard
        title="Google Cloud Platform Shipping API"
        description="This is a RESTful API that allows users to create, read, update, and delete shipping information using Google Cloud Platform services. It was built using Node.js and Google Datastore, and tested using Postman. I wrote a technical specification detailing all of the endpoints and expected responses, which can be found in the README contained in the Github repo."
        githubLink="https://github.com/ledbetni/Google-App-Engine-Portfolio"
      />
      <Box width="100%" height="20px" />
      <ProjectCard
        title="React eCommerce App"
        description="This is a full-stack eCommerce application built with React, Node.js, and MySQL."
        githubLink="https://github.com/ledbetni/react_mySQLEcommerce"
      />
      <Box width="100%" height="20px" />
      <ProjectCard
        title="Resume Business Card Mobile App"
        description="This is a mobile application which serves as a business card and mobile resume. It was built using Flutter."
        githubLink="https://github.com/ledbetni/mobileResume"
      />
      <Box width="100%" height="20px" />
    </div>
  );
};

export default ProjectPage;
