import React from "react";
import { Box, Spacer, Button, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
const Navbar = () => {
  
  return (
    <>
      <Box
        fontFamily={"Poppins"}
        textColor={"gray.600"}
        width={"100%"}
        pt={"3"}
        pb={"3"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box display={"flex"} gap={"10"} alignItems={"center"}>
          <Link to={"/"}> <Box display={'flex'} alignItems={'center'}><MdHome size={'25px'} /><Text>Home</Text></Box></Link>
          <Link to={"/result"}>Results</Link>
          {/* <Link to={"/election"}>Election</Link> */}
          <Link to={"/login"}>Vote</Link>
          <Button colorScheme={"blue"} as={Link} to='/login'>Login</Button>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
