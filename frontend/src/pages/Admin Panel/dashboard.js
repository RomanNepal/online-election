import React from "react";
import { useEffect, useContext } from "react";
import axios from "axios";
import { Button, Box } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../../App";
import AdminNavbar from "../../components/admin.navbar";
import AdminBar from "../../components/adminBar";
const Dashboard = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const toast = useToast();
  const nav = useNavigate();
  const handleClick = () => {
    axios
      .get("http://localhost:3003/admin/list", {
        headers: { "Authorization": localStorage.getItem("adminToken") },
      })
      .then((response) => {
        console.log("Response is ", response.data);
      })
      .catch((err) => {
        toast({
          title: "Session expired, Login again",
          description: "We've created your account for you.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        localStorage.removeItem("adminToken");
        nav("/admin/login");
      });
  };
  return (
    <Box>
      <AdminNavbar />
      {window.location.pathname == "/admin/dashboard" ? (
        <AdminBar></AdminBar>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Dashboard;
