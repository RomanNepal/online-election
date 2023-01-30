import React from "react";
import {
  Box,
  Text,
  Divider,
  Button,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import photo from './images/photo.jpg'
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { useState } from "react";
import "./adminNavbar.css";
const AdminBar = () => {
  const [hover, setHover] = useState(false);
  const toggle = () => {
    setHover(!hover);
  };
  return (
    
      <Box
        display={"flex"}
        flexDirection={"column"}
        className="adminNavbar"
        border={"1px"}
        height={"100%"}
        width={"15%"}
        bgColor={"blue.800"}
        textColor={"white"}
        
      >
        <Link to={"/admin/dashboard/candidate/add"}>
          <Box p={"3"}>Add Candidate </Box>
        </Link>
        <Divider />
        <Link to={"/admin/dashboard/candidate/delete"}>
          <Box p={"3"}>Delete Candidate</Box>
        </Link>
        
        <Divider />
        <Link to={"/admin/dashboard/candidate/list"}>
          <Box p={"3"}>List All Candidate</Box>
        </Link>
                <Divider />
        <Link to={"/admin/dashboard/voter/add"}>
          <Box p={"3"}>Add Voter</Box>
        </Link>

        <Divider />
        <Link to={"/admin/dashboard/voter/update"}>
          <Box p={"3"}>Update Voter</Box>
        </Link>

        <Divider />
        <Link to={"/admin/dashboard/voter/list"}>
          <Box p={"3"}>List All Voters</Box>
        </Link>

        <Divider />
        <Link to={"/admin/dashboard/party/add"}>
          <Box p={"3"}>Add Party</Box>
        </Link>

        <Divider />
        <Link to={"/admin/dashboard/party/list"}>
          <Box p={"3"}>List All Parties</Box>
        </Link>

        <Divider />
        <Link to={"/admin/dashboard/election/add"}>
          <Box p={"3"}>Add Election</Box>
        </Link>

        <Divider />
        <Link to={"/admin/dashboard/voting-area/add"}>
          <Box p={"3"}>Add Voting Area</Box>
        </Link>

        <Divider />
        <Link to={"/admin/dashboard/candidate/add"}>
          <Box p={"3"}>Add Candidate</Box>
        </Link>

        <Divider />
        <Link to={"/admin/dashboard/candidate/list"}>
          <Box p={"3"}>List Candidate</Box>
        </Link>
      </Box>

  );
};

export default AdminBar;
