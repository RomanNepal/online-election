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
} from "@chakra-ui/react";
import axios from "axios";
import AdminBar from "../../components/adminBar";
import { useState } from "react";
const AddVoter = () => {
  const [value, setValue] = useState("1");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("formdata is", formData);
    try {
      let result = await axios.post(
        "http://localhost:3003/voter/delete",
        formData,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
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
            Delete Voter
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack gap={"3"}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input name="full_name" width={"40%"} type={"text"}></Input>
              </FormControl>

              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input name="phone" width={"40%"} type={"number"}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Date of Birth (AD)</FormLabel>
                <Input name="dob" width={"40%"} type={"date"}></Input>
              </FormControl>

              {/* <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="row">
                    <Radio value="1">Male</Radio>
                    <Radio value="2">Female</Radio>
                    <Radio value="3">Other</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl> */}

              <FormControl>
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
                <FormLabel>Voter Area Code</FormLabel>
                <Input
                  name="voter_area_code"
                  width={"40%"}
                  type={"number"}
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel>
                  Photo (Less than 200kb, .jpg & .png format only)
                </FormLabel>
                <Input name="photo" width={"40%"} type={"file"}></Input>
              </FormControl>
              <Input type={"submit"} value={"Add Voter"}></Input>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddVoter;
