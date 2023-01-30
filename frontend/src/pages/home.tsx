import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/navbar";
import hero from "../components/images/hero.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <Navbar />
      <Box
        padding={"5"}
        display={"flex"}
        height={"700px"}
        bgImage={hero}
        backgroundSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPos={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        textColor={"white"}
      >
        <Text
          fontFamily={"Poppins"}
          fontSize={"7xl"}
          textColor={"white"}
          fontWeight={"bold"}
        >
          NEPAL ONLINE VOTING SYSTEM
        </Text>
        <Text mb={"5"}>
          Did you know, according to Local Election data 2079, around 80% voters
          preferred online voting methods.
        </Text>

        <Button as={Link} to="/login" width={"20%"} colorScheme={"blue"}>
          Vote Now
        </Button>
      </Box>
    </>
  );
};

export default Home;
