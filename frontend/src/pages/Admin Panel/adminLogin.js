import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import React from "react";
import { Form, Navigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../App";
import Dashboard from "./dashboard";
const AdminLogin = ({ component }) => {
  //   const { loggedIn, setLoggedIn } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setLoggedIn(true);
      nav("/admin/dashboard");
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(data);
    if (!localStorage.getItem("adminToken")) {
      axios
        .post("http://localhost:3003/admin/login", data)
        .then((result) => {
          console.log(result.data.token);
          localStorage.setItem("adminToken", result.data.token);
          setLoggedIn(true);
          console.log("Admin token set");
        })
        .catch((err) => {
          console.log("Invalid Credentials");
        });
    } else {
      console.log("Token already present");
    }
  };

  return (
    <>
      {!loggedIn ? (
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
        >
          <Box mt={"10%"} width={"25%"}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Enter Your Username {"(Admin Only)"}</FormLabel>
                <Input
                  borderRadius={"lg"}
                  type={"text"}
                  name="username"
                ></Input>
              </FormControl>
              <br></br>
              <FormControl isRequired>
                <FormLabel>Enter Password</FormLabel>
                <Input
                  borderRadius={"lg"}
                  type={"password"}
                  name="password"
                ></Input>
              </FormControl>
              <br></br>
              <Input
                as={Button}
                bgColor={"blue.600"}
                color={"white"}
                type={"submit"}
              >
                Login
              </Input>
            </form>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};
export {};
export default AdminLogin;
