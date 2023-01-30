import React from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import AdminBar from "../../components/adminBar";
const AddVotingArea = () => {
  const [photo, setPhoto] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = new FormData(e.target);
    try {
      let response = await axios.post(
        "http://localhost:3003/voting-area/add",
        data,
        {
          headers: { Authorization: localStorage.getItem("adminToken") },
        }
      );
      toast({
        title: `${response.data.msg}`,
        description: "Voting Area Added Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      e.target.reset()
    } catch (err) {
      console.log(err);
      toast({
        title: `Error adding voting area`,
        description: "Voting Area Coulnot be added",
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
            Add Voting Area
          </Text>

          <form onSubmit={handleSubmit} id="form">
            <Stack gap={"3"}>
              <FormControl isRequired>
                <FormLabel>Area Name</FormLabel>
                <Input name="area_name" width={"40%"} type={"text"}></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Area Province</FormLabel>
                <Input name="area_province" width={"40%"} type={"text"}></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Area District</FormLabel>
                <Input name="area_district" width={"40%"} type={"text"}></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Total Voters</FormLabel>
                <Input name="total_voters" width={"40%"} type={"text"}></Input>
              </FormControl>

              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"40%"}
                textColor={"white"}
                type={"submit"}
                value={"Add Party"}
              >
                Add Voting Area
              </Input>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddVotingArea;
