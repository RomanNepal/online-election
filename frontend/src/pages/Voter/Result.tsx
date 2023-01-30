import React from "react";
import AdminNavbar from "../../components/adminBar";
import {
  Box,
  Text,
  useToast,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import AdminBar from "../../components/adminBar";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
const ListCandidate = () => {
  const [candidate, setcandidate] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    const getcandidate = async () => {
      try {
        let result = await axios.get("http://localhost:3003/candidate/list", {
          headers: { Authorization: localStorage.getItem("adminToken") },
        });
        console.log(result.data.result);
        setcandidate(result.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    getcandidate();
  }, []);

  return (
    <>
    <Navbar />
      <Box display={"flex"} justifyContent={'center'}>
        <Box
          display={"flex"}
          
          pl={"20"}
          pr={"20"}
          flexDirection={"column"}
        >
          <Text mb={"3"} fontSize={"2xl"} fontWeight={"bold"}>
            Result
          </Text>

          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Vote Count</Th>
                  {/* <Th>_id</Th> */}
                  <Th>Party</Th>
                  <Th>Election</Th>
                  <Th>Voting Area</Th>
                  <Th>Symbol</Th>
                </Tr>
              </Thead>
              <Tbody>
                {typeof candidate[0] != "undefined" ? (
                  candidate.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.full_name}</Td>
                        <Td>{item.count}</Td>
                        {/* <Td>{item._id}</Td> */}
                        <Td>{item.party.party_name}</Td>
                        <Td>{item.election.election_name}</Td>
                        <Td>
                          {item.voting_area.area_district},
                          {item.voting_area.area_name}
                        </Td>
                        <Td>
                          <Box>
                            <Image
                              src={`http://localhost:3003/uploads/${item.candidate_symbol}`}
                              height={"50px"}
                              width={"50px"}
                            ></Image>
                          </Box>
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default ListCandidate;
