import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";

const Login = () => {
  const form = useRef()
  //   const { loggedIn, setLoggedIn } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [voter_id, setVoterId] = useState();
  const nav = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    e.preventDefault();
    setVoterId(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidVoter = async () => {
      try {
        let result = await axios.get(`http://localhost:3003/voter/${voter_id}`);
        if(result.data.result.has_voted==1){
          toast({
            title: "Your vote is already registered",
            description: "You cannot vote twice",
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          nav('/home',{replace:true})
        }
        else{
          if(localStorage.getItem('voterToken')){
            nav(`/vote/${voter_id}`)
          }
          if (result?.status == 200) {
            nav(`/smsverify/${voter_id}`)
          } else {
            toast({
              title: "Voter ID doesn't exist",
              description: "Please Enter a valid voter ID",
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            document.getElementById('form').reset()
  
          }
        }
      } catch (err) {
        document.getElementById('form').reset()
        toast({
          title: "Voter ID doesn't exist",
          description: "Please Enter a valid voter ID",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        
      }
    };
    isValidVoter();
  };

  return (
    <>
      <Navbar />
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
      >
        <Box mt={"10%"} width={"25%"}>
          <form onSubmit={handleSubmit} ref={form} id='form'>
            <FormControl isRequired>
              <FormLabel>Enter Your Voter ID</FormLabel>
              <Input
                borderRadius={"lg"}
                type={"text"}
                value={voter_id}
                name="voter_id"
                onChange={handleChange}
              ></Input>
            </FormControl>

            <br></br>
            <Input
              as={Button}
              bgColor={"blue.600"}
              color={"white"}
              type={"submit"}
            >
              Next
            </Input>
          </form>
        </Box>
      </Box>
    </>
  );
};
export {};
export default Login;
