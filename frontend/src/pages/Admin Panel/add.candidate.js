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
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminBar from "../../components/adminBar";

const AddCandidate = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    candidate_symbol: "",
    gender: "",
    photo: "",
    voting_area: 0,
    election: 0,
    party: 0,
  });

  const [votingArea, setVotingArea] = useState([]);
  const [election, setElection] = useState([]);
  const [party, setParty] = useState([]);
  useEffect(() => {
    const getVotingArea = async () => {
      try {
        let result = await axios.get("http://localhost:3003/voting-area/list", {
          headers: { Authorization: localStorage.getItem("adminToken") },
        });

        setVotingArea(result.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    const getElection = async () => {
      try {
        let result = await axios.get("http://localhost:3003/election/list", {
          headers: { Authorization: localStorage.getItem("adminToken") },
        });
        setElection(result.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    const getParty = async () => {
      try {
        let result = await axios.get("http://localhost:3003/party/list", {
          headers: { Authorization: localStorage.getItem("adminToken") },
        });
        setParty(result.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    getVotingArea();
    getElection();
    getParty();
  }, []);

  const uploadCandidatePhoto = async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    try {
      let response = await axios.post("http://localhost:3003/upload", data, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      if (response) {
        console.log(response.data.image.title);
        setFormData({ ...formData, photo: response.data.image.title });
        toast({
          title: `${response.data.msg}`,
          description: `${formData.photo}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadCandidateSymbol = async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    try {
      let response = await axios.post("http://localhost:3003/upload", data, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      if (response) {
        setFormData({
          ...formData,
          candidate_symbol: response.data.image.title,
        });
        toast({
          title: `${response.data.msg}`,
          description: `${formData.candidate_symbol}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData.photo, formData.candidate_symbol);
    setFormData((prev) => ({
      ...prev,
      candidate_symbol: formData.candidate_symbol.toString(),
      photo: formData.photo.toString(),
    }));
    console.log("data is", formData);
    if (
      !formData.election ||
      !formData.full_name ||
      formData.gender ||
      formData.party ||
      formData.photo ||
      formData.voting_area
    ) {
      toast({
        title: `Please fill up all the required fields`,
        description: "",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      try {
        let response = await axios.post(
          "http://localhost:3003/candidate/add",
          formData,
          {
            headers: { Authorization: localStorage.getItem("adminToken") },
          }
        );
        document.getElementById("form1").reset();
        document.getElementById("form2").reset();
        document.getElementById("form3").reset();
        toast({
          title: `${response.data.msg}`,
          description: "Candidate Added Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (err) {
        console.log(err);
      }
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
            Add Candidate
          </Text>
          <form onSubmit={uploadCandidatePhoto} id="form1">
            <FormControl isRequired>
              <FormLabel>Candidate Photo</FormLabel>
              <Input name="image" width={"40%"} type={"file"}></Input>
              &nbsp;
              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"10%"}
                type={"submit"}
                textColor={"white"}
              >
                Upload
              </Input>
            </FormControl>
          </form>

          <form onSubmit={uploadCandidateSymbol} id="form2">
            <FormControl isRequired>
              <FormLabel>Candidate Symbol</FormLabel>
              <Input name="image" width={"40%"} type={"file"}></Input>
              &nbsp;
              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"10%"}
                type={"submit"}
                textColor={"white"}
              >
                Upload
              </Input>
            </FormControl>
          </form>

          <form id="form3">
            <Stack gap={"3"}>
              <FormControl isRequired>
                <FormLabel>Candidate Name</FormLabel>
                <Input
                  isRequired
                  name="full_name"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.full_name}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Select Gender</FormLabel>
                <input
                  id="male"
                  type={"radio"}
                  name="gender"
                  value="male"
                  onChange={handleChange}
                ></input>
                <label>Male &nbsp;</label>
                <input
                  type={"radio"}
                  name="gender"
                  value="female"
                  onChange={handleChange}
                ></input>
                <label>Female &nbsp;</label>
                <input
                  type={"radio"}
                  name="gender"
                  value="other"
                  onChange={handleChange}
                ></input>
                <label>Other</label>
              </FormControl>

              <FormControl isRequired>
                <Select
                  placeholder="Select Voting Area"
                  width={"40%"}
                  name="voting_area"
                  value={formData.voting_area}
                  onChange={handleChange}
                >
                  {typeof votingArea[0] != null
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
                <Select
                  placeholder="Select Election"
                  width={"40%"}
                  value={formData.election}
                  onChange={handleChange}
                  name={"election"}
                >
                  {typeof votingArea[0] != null
                    ? election.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.election_name}
                          </option>
                        );
                      })
                    : ""}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <Select
                  placeholder="Select Party"
                  width={"40%"}
                  value={formData.party}
                  onChange={handleChange}
                  name={"party"}
                >
                  {typeof votingArea[0] != null
                    ? party.map((item, index) => {
                        return (
                          <option
                            onChange={handleChange}
                            key={index}
                            value={item._id}
                          >
                            {item.party_name}
                          </option>
                        );
                      })
                    : ""}
                </Select>
              </FormControl>

              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"40%"}
                textColor={"white"}
                value={"Add Party"}
                onClick={handleSubmit}
              >
                Add Candidate
              </Input>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddCandidate;
