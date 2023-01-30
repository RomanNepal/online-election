import React from "react";
import { useState } from "react";
import { Box, Text, Button, Avatar, Divider } from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import photo from "./images/photo.jpg";
const AdminNavbar = () => {
  const nav = useNavigate();
  const [hover, setHover] = useState(false);
  const toggle = () => {
    setHover(!hover);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    nav("/admin/login");
  };
  return (
    <Box
      pt={"5"}
      pb={"5"}
      pr={"10"}
      width={"100%"}
      display={"flex"}
      justifyContent={"end"}
      gap={"5"}
    >
      <Link to={""}>
        <Box position={"relative"} onClick={toggle}>
          <Avatar name={"Roman Nepal"} src={photo}></Avatar>
          <Box
            borderRadius={"50%"}
            height={"5"}
            width={"5"}
            position={"absolute"}
            top={"8"}
            left={"8"}
            bgImage={
              "url(https://media.istockphoto.com/id/1313547780/vector/profile-verification-check-marks-icons-vector-illustration.jpg?s=612x612&w=0&k=20&c=XDWxGC05gd-sTn_cBvlI2aG1onqOdiVdPb0IeFO-Q2M=)"
            }
            bgPos={"center"}
            bgSize={"cover"}
          ></Box>
          {hover == true ? (
            <Box
              mt={"1"}
              border={"1px"}
              borderRadius={"lg"}
              borderColor={"gray.200"}
              pos={"absolute"}
              right={"0"}
              width={"150px"}
              textAlign={"center"}
              textColor={"gray.500"}
            >
              <Text>Roman Nepal</Text>
              <Divider />
              <Text>Admin</Text>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Link>

      <Button colorScheme={"blue"} borderRadius={"3xl"} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default AdminNavbar;

