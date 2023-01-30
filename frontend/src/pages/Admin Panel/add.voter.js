import React from "react";
import AdminNavbar from "../../components/adminBar";
import {
  Box,
  Text,
  Input,
  FormControl,
  Button,
  FormLabel,
  Stack,
  RadioGroup,
  Radio,
  useToast,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import AdminBar from "../../components/adminBar";
import { useState, useEffect } from "react";
const AddVoter = () => {
  const [value, setValue] = useState("1");
  const toast = useToast();
  const [votingArea, setVotingArea] = useState([]);
  useEffect(() => {
    const getVotingArea = async () => {
      try{
        let response = await axios.get("http://localhost:3003/voting-area/list", {
          headers: { Authorization: localStorage.getItem("adminToken") },
        });
        if(response){
          setVotingArea(response.data.result)
        }
      }catch(err){
        console.log(err)
      }
      
    };
    getVotingArea();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("formdata is", formData);
    try {
      let result = await axios.post(
        "http://localhost:3003/voter/add",
        formData,
        { headers: { authorization: localStorage.getItem("adminToken") } }
      );
      console.log(result);
      e.target.reset();
      toast({
        title: "Voter Added Successfully",
        description: "Voter Added Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Voter couln't be added",
        description: "Sorry, we encountered a problem",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Box display={"flex"}>
        <AdminBar />
        <Box
          display={"flex"}
          width={"85%"}
          pl={"20"}
          pr={"20"}
          flexDirection={"column"}
        >
          <Text mb={"3"} fontSize={"2xl"} fontWeight={"bold"}>
            Add Voter
          </Text>
        
          <form onSubmit={handleSubmit} id="form">
            <Stack gap={"3"}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input name="full_name" width={"40%"} type={"text"}></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input name="phone" width={"40%"} type={"number"}></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date of Birth (AD)</FormLabel>
                <Input name="dob" width={"40%"} type={"date"}></Input>
              </FormControl>

              {/* <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="row">
                    <Radio value="1">Male</Radio>
                    <Radio value="2">Female</Radio>
                    <Radio value="3">Other</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl> */}

              <FormControl isRequired>
                <FormLabel>Select Gender</FormLabel>
                <input
                  id="male"
                  type={"radio"}
                  name="gender"
                  value="male"
                ></input>
                <label>Male &nbsp;</label>
                <input type={"radio"} name="gender" value="female"></input>
                <label>Female &nbsp;</label>
                <input type={"radio"} name="gender" value="other"></input>
                <label>Other</label>
              </FormControl>
              <FormControl>
              <Select
                  placeholder="Select Voting Area"
                  width={"40%"}
                  name="voting_area"
                >
                  {votingArea
                    ? votingArea.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.area_name},Province {item.area_province},
                            {item.area_district}
                          </option>
                        );
                      })
                    : ""}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>
                  Photo (Less than 400kb, .jpg & .png format only)
                </FormLabel>
                <Input name="photo" width={"40%"} type={"file"}></Input>
              </FormControl>
              <Input
                type={"submit"}
                value={"Add Voter"}
                as={Button}
                bgColor={"blue.500"}
                width={"40%"}
                textColor={"white"}
              >
                Add Voter
              </Input>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddVoter;
export {};
