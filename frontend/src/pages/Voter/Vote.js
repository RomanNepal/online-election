import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Vote = () => {
  const [formData1, setFormData1] = useState({
    candidate: "",
    election: "",
    voting_area: "",
    party: "",
  });

  const [formData2, setFormData2] = useState({
    candidate: "",
    election: "",
    voting_area: "",
    party: "",
  });

  const [formData3, setFormData3] = useState({
    candidate: "",
    election: "",
    voting_area: "",
    party: "",
  });

  const [formData4, setFormData4] = useState({
    candidate: "",
    election: "",
    voting_area: "",
    party: "",
  });
  const nav = useNavigate();
  const toast = useToast();
  const [voter, setVoter] = useState({});
  const [voted, setVoted] = useState(false);
  const [candidate, setCandidate] = useState([]);
  const [party, setParty] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getVoter = async () => {
      try {
        let voter = await axios.get(`http://localhost:3003/voter/${id}`);
        // if (voter.data.result.has_voted == true) {
        //   toast({
        //     title: "You've already voted",
        //     description: "Please wait for another election",
        //     status: "error",
        //     duration: 5000,
        //     isClosable: true,
        //   });
        //   setVoted(true)
        //   nav('/login')
        // }
        let candidate = await axios.get("http://localhost:3003/candidate/list");
        let party = await axios.get("http://localhost:3003/party/list");
        setVoter(voter.data.result);
        setCandidate(candidate.data.result);
        setParty(party.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    getVoter();
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem('voterToken')
    nav('/home')
    toast({
      title: "Logged Out",
      description: "",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    
  }

  const handleChange1 = (e) => {
    setFormData1({
      ...formData1,
      [e.target.name]: e.target.value,
      election: "637a32e1ab6aa51df274a3cd",
      voting_area: voter.voting_area._id,
    });
    console.log(formData1);
  };

  const handleChange2 = (e) => {
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
      election: "637a32faab6aa51df274a3d0",
      voting_area: voter.voting_area._id,
    });
    console.log(formData2);
  };

  const handleChange3 = (e) => {
    setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
      election: "637a3308ab6aa51df274a3d3",
      voting_area: voter.voting_area._id,
    });
    console.log(formData3);
  };

  const handleChange4 = (e) => {
    setFormData4({
      ...formData4,
      [e.target.name]: e.target.value,
      election: "637a3313ab6aa51df274a3d6",
      voting_area: voter.voting_area._id,
    });
    console.log(formData4);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside submit");
    if (voter.has_voted == true) {
      toast({
        title: "You have already voted",
        description: "Let's wait for next election",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      nav("/");
    } else {
      try {
        let response1 = await axios.post(
          `http://localhost:3003/vote/add`,
          formData1
        );

        let response2 = await axios.post(
          `http://localhost:3003/vote/add`,
          formData2
        );

        let response3 = await axios.post(
          `http://localhost:3003/vote/add`,
          formData3
        );
        let response4 = await axios.post(
          `http://localhost:3003/vote/add`,
          formData4
        );

        console.log("response 1 data is", response1.data);
        console.log("response 2 data is", response2.data);
        console.log("response 3 data is", response3.data);
        console.log("response 4 data is", response4.data);

        let updateVoter = await axios.put(
          `http://localhost:3003/voter/update/${id}`,
          { has_voted: 1 }
        );
        if (updateVoter.data) {
        }

        if (
          response1.data ||
          response2.data ||
          response3.data ||
          response4.data
        ) {
          toast({
            title: "Your Vote has been submitted",
            description: "Let's wait for the result",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          localStorage.removeItem('voterToken')
          nav("/login");
        }
      } catch (err) {
        console.log(err);
        toast({
          title: "Your Vote was not submitted",
          description: "Error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <>
      {!voted ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={'center'}
            bgColor={"blue.600"}
            pt={"2"}
            pb={"2"}
            pl={'10'}
            pr={'10'}
          >
            {voter?.photo ? (
              <>
                <Image
                  src={`${voter.photo}`}
                  height={"50px"}
                  width={"50px"}
                  borderRadius={"50%"}
                  border={"2px"}
                  borderColor={"teal.500"}
                ></Image>
                <Box fontFamily={'Poppins'} textColor={'whiteAlpha.700'}>
                  <Text>{voter.full_name}, ID:{voter.voter_id}</Text>
                  <Text mt={'-1'}>
                    {voter.voting_area.area_name}, Province{" "}
                    {voter.voting_area.area_province},{" "}
                    {voter.voting_area.area_district}
                  </Text>
                </Box>
                <Spacer></Spacer>
                <Button ml={'10'} onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              ""
            )}
          </Box>
          <Box padding={"10"}>
            {/* <Text textAlign={"center"}>
              {voter?.voting_area?.area_name},Province{" "}
              {voter?.voting_area?.area_province},{" "}
              {voter?.voting_area?.area_district}
            </Text> */}
            <Text textColor={'gray.600'} textAlign={"center"}>Please Select Your Candidate</Text>
            <Text textColor={'gray.600'} textAlign={"center"}><b>Note:</b> You can only vote once</Text>
<br></br>
            <form>
              <FormLabel
                textAlign={"center"}
                fontSize={"3xl"}
                fontWeight={"bold"}
              >
                Pratinidhi Sabha (Pratyakshya)
              </FormLabel>
              <Box
                padding={"5"}
                display={"flex"}
                border={"1px"}
                borderRadius={"xl"}
                borderColor={"gray.200"}
                gap={"5"}
                boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              >
                {candidate?.map((item, index) => {
                  if (voter?.voting_area?._id == item?.voting_area?._id) {
                    return (
                      <FormControl
                        isRequired
                        display={"flex"}
                        gap={"3"}
                        justifyContent={"center"}
                        flexDirection={"row"}
                      >
                        <input
                          type={"radio"}
                          name={"candidate"}
                          value={item._id}
                          onChange={handleChange1}
                        ></input>

                        <label>
                          <Image
                            // boxShadow={
                            //   "rgba(60, 64, 67, 0.3) 0px 1px 1px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                            // }
                            src={`http://localhost:3003/uploads/${item.candidate_symbol}`}
                            height={"50px"}
                            width={"50px"}
                            // _hover={{ borderColor: "green", border: "1px" }}
                          ></Image>
                          {/* <Text textAlign={"center"}>{item.full_name}</Text> */}
                        </label>
                      </FormControl>
                    );
                  }
                })}
              </Box>
            </form>
            <br></br>
            <br></br>
            <br></br>
            <form>
              <FormLabel
                textAlign={"center"}
                fontSize={"3xl"}
                fontWeight={"bold"}
              >
                Pratinidhi Sabha Samanupatik
              </FormLabel>
              <Box
                padding={"5"}
                display={"flex"}
                border={"1px"}
                borderRadius={"xl"}
                borderColor={"gray.200"}
                gap={"5"}
                boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              >
                {party?.map((item, index) => {
                  return (
                    <FormControl
                      isRequired
                      display={"flex"}
                      gap={"3"}
                      justifyContent={"center"}
                      flexDirection={"row"}
                      key={index}
                    >
                      <input
                        type={"radio"}
                        name={"party"}
                        value={item._id}
                        onChange={handleChange2}
                      ></input>
                      <label>
                        <Image
                          src={`http://localhost:3003/uploads/${item.party_symbol}`}
                          height={"50px"}
                          width={"50px"}
                        ></Image>
                      </label>
                    </FormControl>
                  );
                })}
              </Box>
              {/* <Input
              as={Button}
              bgColor={"blue.500"}
              textColor={"white"}
              onClick={handleSubmit1}
            >
              Submit Vote
            </Input> */}
            </form>
            <br></br>
            <br></br>
            <br></br>
            <form>
              <FormLabel
                textAlign={"center"}
                fontSize={"3xl"}
                fontWeight={"bold"}
              >
                Pradesh Sabha Pratyakshya
              </FormLabel>
              <Box
                padding={"5"}
                display={"flex"}
                border={"1px"}
                borderRadius={"xl"}
                borderColor={"gray.200"}
                gap={"5"}
                boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              >
                {candidate?.map((item, index) => {
                  if (
                    item?.election.election_name == "Pradesh Pratyakshya" &&
                    voter?.voting_area?.area_province ==
                      item?.voting_area?.area_province
                  ) {
                    return (
                      <FormControl
                        isRequired
                        display={"flex"}
                        gap={"3"}
                        justifyContent={"center"}
                        flexDirection={"row"}
                      >
                        <input
                          type={"radio"}
                          name={"candidate"}
                          value={item._id}
                          onChange={handleChange3}
                        ></input>
                        <label>
                          <Image
                            src={`http://localhost:3003/uploads/${item.candidate_symbol}`}
                            height={"50px"}
                            width={"50px"}
                          ></Image>
                        </label>
                      </FormControl>
                    );
                  }
                })}
              </Box>
              {/* <Input
              as={Button}
              bgColor={"blue.500"}
              textColor={"white"}
              onClick={handleSubmit}
            >
              Submit Vote
            </Input> */}
            </form>
            <br></br>
            <br></br>
            <br></br>
            <form>
              <FormLabel
                textAlign={"center"}
                fontSize={"3xl"}
                fontWeight={"bold"}
              >
                Pradesh Sabha Samanupatik
              </FormLabel>
              <Box
                padding={"5"}
                display={"flex"}
                border={"1px"}
                borderRadius={"xl"}
                borderColor={"gray.200"}
                gap={"5"}
                boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              >
                {party?.map((item, index) => {
                  return (
                    <FormControl
                      isRequired
                      display={"flex"}
                      gap={"3"}
                      justifyContent={"center"}
                      flexDirection={"row"}
                      key={index}
                    >
                      <input
                        type={"radio"}
                        name={"party"}
                        value={item._id}
                        onChange={handleChange4}
                      ></input>
                      <label>
                        <Image
                          src={`http://localhost:3003/uploads/${item.party_symbol}`}
                          height={"50px"}
                          width={"50px"}
                        ></Image>
                      </label>
                    </FormControl>
                  );
                })}
              </Box>
              {/* <Input
              as={Button}
              bgColor={"blue.500"}
              textColor={"white"}
              onClick={handleSubmit1}
            >
              Submit Vote
            </Input> */}
            </form>
            <br></br>
            <Input
              as={Button}
              bgColor={"blue.500"}
              textColor={"white"}
              onClick={handleSubmit}
            >
              Submit Vote
            </Input>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Vote;
