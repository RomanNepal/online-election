import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/Admin Panel/adminLogin";
import Home from "./pages/home";
import Dashboard from "./pages/Admin Panel/dashboard";
import ProtectedRoutes from "./pages/Admin Panel/protected.routes";
import { createContext, useState } from "react";
import AdminNavbar from "./components/adminBar";
import ReverseProtectedRoutes from "./pages/Admin Panel/reverse.protected.routes";
import Navbar from "./components/navbar";
import Login from "./pages/Voter/Login";
import Result from "./pages/Voter/Result";
import Election from "./pages/Voter/Election";
import AddVoter from "./pages/Admin Panel/add.voter";
import ListVoter from "./pages/Admin Panel/list.voter";
import AddParty from "./pages/Admin Panel/add.party";
import ListParty from "./pages/Admin Panel/list.party";
import AddElection from "./pages/Admin Panel/add.election";
import { Box } from "@chakra-ui/react";
import AddVotingArea from "./pages/Admin Panel/add.voting.area";
import AddCandidate from "./pages/Admin Panel/add.candidate";
import ListCandidate from "./pages/Admin Panel/list.candidate";
import Vote from "./pages/Voter/Vote";
import SmsVerify from "./pages/Voter/SmsVerify";
import TestTable from "./pages/Voter/Result2";
export const UserContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const value = { loggedIn, setLoggedIn };
  return (
    <Box fontFamily={"Inter"}>
      <UserContext.Provider value={value}>
        <Router>
          <Routes>
            <Route path={"/"} element={<Home />}></Route>
            <Route path={"/home"} element={<Home />}></Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard/"
              element={<ProtectedRoutes component={<Dashboard />} />}
            >
              <Route
                path="/admin/dashboard/voter/add"
                element={<AddVoter />}
              ></Route>
              <Route path="/admin/dashboard/voter/update/"></Route>
              <Route path="/admin/dashboard/voter/delete/"></Route>
              <Route
                path="/admin/dashboard/voter/list/"
                element={<ListVoter />}
              ></Route>
              <Route
                path="/admin/dashboard/party/add"
                element={<AddParty />}
              ></Route>
              <Route
                path="/admin/dashboard/party/list"
                element={<ListParty />}
              ></Route>
              <Route
                path="/admin/dashboard/election/add"
                element={<AddElection />}
              ></Route>
              <Route
                path="/admin/dashboard/voting-area/add"
                element={<AddVotingArea />}
              ></Route>
              <Route
                path="/admin/dashboard/candidate/add"
                element={<AddCandidate />}
              ></Route>
              <Route
                path="/admin/dashboard/candidate/list"
                element={<ListCandidate />}
              ></Route>
            </Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/smsverify/:id" element={<SmsVerify />}></Route>
            <Route path="/result" element={<Result />}></Route>
            <Route path="/result2" element={<TestTable />}></Route>
            <Route path="/election" element={<Election />}></Route>
            <Route path="/vote/:id" element={<Vote />}></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </Box>
  );
}

export default App;
