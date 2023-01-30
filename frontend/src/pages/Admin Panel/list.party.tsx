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
  Tbody,Image
} from "@chakra-ui/react";
import axios from "axios";
import AdminBar from "../../components/adminBar";
import { useState, useEffect } from "react";
const ListParty = () => {
  const [party, setParty] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    const getParty = async () => {
      try {
        let result = await axios.get("http://localhost:3003/party/list", {
          headers: { Authorization: localStorage.getItem("adminToken") },
        });
        console.log(result.data.result);
        setParty(result.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    getParty();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("formdata is", formData);
    try {
      let result = await axios.post(
        "http://localhost:3003/party/list",
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
            All Parties
          </Text>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Party Name</Th>
                  <Th>_id</Th>
                  <Th>Symbol</Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                {typeof party[0] != "undefined"
                  ? party.map((item, index) => {
                      return (
                        <Tr>
                          <Td>{item.party_name}</Td>
                          <Td>{item._id}</Td>
                          <Td><Box><Image src={`http://localhost:3003/uploads/${item.party_symbol}`} height={'50px'} width={'50px'}></Image></Box></Td>
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

export default ListParty;
