import React from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,useToast
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import AdminBar from "../../components/adminBar";
const AddParty = () => {
  const [photo, setPhoto] = useState("");
const toast = useToast()
  const handleUpload = async (e:any) => {
    e.preventDefault();
    let data = new FormData(e.target);

    try {
      let result = await axios.post("http://localhost:3003/upload", data, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      setPhoto(result.data.image.title);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    let data = new FormData(e.target);
    try {
      let response = await axios.post("http://localhost:3003/party/add", data, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      toast({
        title: `${response.data.msg}`,
        description: "Party Added Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `Couldnot add party`,
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
            Add Party
          </Text>

          <form onSubmit={handleSubmit} id="form">
            <Stack gap={"3"}>
              <FormControl isRequired>
                <FormLabel>Party Name</FormLabel>
                <Input name="party_name" width={"40%"} type={"text"}></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>
                  Party Symbol (Less than 400kb, .jpg & .png format only)
                </FormLabel>
                <Input
                  name="party_symbol"
                  id="party_symbol"
                  width={"40%"}
                  type={"file"}
                ></Input>
              </FormControl>
              <Input as={Button} bgColor={'blue.500'} width={'40%'} textColor={'white'} type={"submit"} value={"Add Party"}>Add Party</Input>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddParty;
