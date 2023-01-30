import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar";

const SmsVerify = ({ prop }) => {
  const nav = useNavigate();
  const toast = useToast();
  let otpserver = 1234;
  const [otp, setOtp] = useState();
  const form = useRef();
  const { id } = useParams();
  const [sent, setSent] = useState(false);
  const sendOtp = async () => {
    console.log("voter id is ", id);
    axios.get(`http://localhost:3003/voter/${id}`).then((response)=>{
    if(response.data.result.has_voted==true){
      toast({
        title: "You've already voted",
        description: "Please Wait for Another Election",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      nav('/')
    }
    }).catch((err)=>{
      console.log(err)
    })
    try {
      let response = axios.post("http://localhost:3003/sms-verification/send", {
        voter_id: id,
      });
      if (response) {
        toast({
          title: "OTP sent successfully",
          description: "Enter your OTP",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setSent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
    console.log(otp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const verifyOtp = async () => {
      console.log("voter id is ", id);
    
      try {
        let response = await axios.post("http://localhost:3003/sms-verify", {
          voter_id: id,
          otp: otp,
        });

        console.log(response);
        if (response) {
          localStorage.setItem("voterToken", response.data.token);
          nav(`/vote/${id}`, { replace: true });
          toast({
            title: "Voter Verified",
            description: "Logged in successfully",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        } else if (response?.status == 401) {
          toast({
            title: "OTP Incorrect, Type Again",
            description: "",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (err) {
        toast({
          title: "Invalid Verification Code",
          description: "Please Enter the valid code",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };

    verifyOtp();
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
          <form onSubmit={handleSubmit} ref={form} id="form">
            <FormControl isRequired>
              <FormLabel>Enter The OTP Sent to your mobile </FormLabel>
              {sent ? (
                <Input
                  borderRadius={"lg"}
                  type={"text"}
                  value={otp}
                  name="otp"
                  onChange={handleChange}
                ></Input>
              ) : (
                ""
              )}
            </FormControl>

            <br></br>
            {sent ? (
              <Input
                as={Button}
                bgColor={"blue.600"}
                color={"white"}
                type={"submit"}
              >
                Next
              </Input>
            ) : (
              ""
            )}
            {!sent ? (
              <Input
                as={Button}
                bgColor={"blue.600"}
                color={"white"}
                onClick={sendOtp}
              >
                Send Code
              </Input>
            ) : (
              ""
            )}
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SmsVerify;
