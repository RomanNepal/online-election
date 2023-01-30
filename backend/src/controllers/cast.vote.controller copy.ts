import axios from "axios";
import { ObjectID } from "bson";

const Voter = require("../models/voter.model");
const Candidate = require("../models/candidate.model");
const CONSTANTS = require("../config/constants");
const CastVote = require("../models/cast_vote.model");
const generateVoterId = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const addVote = async (req: any, res: any, next: any) => {
  let data = req.body;
  if (req.file) {
    data.photo = req.file.filename;
  }
  if (data.election) {
    data.election = new ObjectID(data.election);
  } else {
    data.election = new ObjectID("000000000000");
  }

  if (data.candidate) {
    console.log("data.candidate is ", data.candidate);
    axios
      .get(`http://localhost:3003/candidate/${data.candidate}`)
      .then((result) => {
        const getCandidate = async () => {
          try {
            await Candidate.findByIdAndUpdate(data.candidate, {
              $set: { count: result.data.result.count + 1 },
            });
          } catch (err) {
            console.log(err);
          }
        };
        getCandidate();
      })
      .catch((err) => {
        console.log(err);
      });
    data.candidate = new ObjectID(data.candidate);
  } else {
    data.candidate = null;
  }

  if (data.party) {
    data.party = new ObjectID(data.party);
  } else {
    data.party = null;
  }

  if (data.voting_area) {
    data.voting_area = new ObjectID(data.voting_area);
  } else {
    data.voting_area = new ObjectID("000000000000");
  }
  try {
    let result = new CastVote(data);
    result.save();
    res.status(200).json({ msg: `Vote Casted Successfully`, result: result });
  } catch (error) {
    res.status(500).json({ msg: "Error Casting Vote" });
  }
};

const listVote = async (req: any, res: any, next: any) => {
  try {
    let vote = await CastVote.find({})
      .populate("election")
      .populate("voting_area")
      .populate("party")
      .populate("candidate")
      .populate({ path: "candidate", populate: { path: "voting_area" } });
    res.json({ msg: "Votes fetched successfully", result: vote });
  } catch (error) {
    res.status(500).json({ msg: "Error listing voters" });
  }
};

const getVoterById = async (req: any, res: any, next: any) => {
  let data = req.body;
  try {
    let voter = await Voter.findOne({ voter_id: req.params.id }).populate(
      "voting_area"
    );
    if (voter["photo"]) {
      voter["photo"] = CONSTANTS.host + voter["photo"];
    }
    res.json({ msg: "Voter fetched successfully", result: voter });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching voter" });
  }
};

export {};
module.exports = { addVote, listVote };
