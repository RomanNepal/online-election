import React from "react";
import AdminNavbar from "../../components/adminBar";
import {
  Box,
  Text,
  useToast,
  TableContainer,
  Table,
  Thead,
  TableCaption,
  Th,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import axios from "axios";
import AdminBar from "../../components/adminBar";
import { useState, useEffect } from "react";
const ListVoter = () => {
  const [voter, setVoter] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    const getVoters = async () => {
      try {
        let result = await axios.get("http://localhost:3003/voter/list", {
          headers: { Authorization: localStorage.getItem("adminToken") },
        });
        console.log(result.data.result);
        setVoter(result.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    getVoters();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("formdata is", formData);
    try {
      let result = await axios.post(
        "http://localhost:3003/voter/list",
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
            All Voters
          </Text>

          <TableContainer>
            <Table variant={'striped'}>
              <Thead>
                <Tr>
                  <Th>Full Name</Th>
                  <Th>Voter ID</Th>
                  <Th>Voting Area</Th>
                  <Th>Gender</Th>
                  <Th textAlign={'center'}>Phone</Th>
                </Tr>
              </Thead>
              <Tbody>
                {typeof voter[0] != "undefined"
                  ? voter.map((item, index) => {
                      return (
                        <Tr textAlign={'center'}>
                          <Td>{item.full_name}</Td>
                          <Td>{item.voter_id}</Td>
                          <Td>{item.voting_area.area_name}</Td>
                          <Td>{item.gender}</Td>
                          <Td textAlign={'center'}>{item.phone}</Td>
                        </Tr>
                      );
                    })
                  : ""}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default ListVoter;
