const Candidate = require("../models/candidate.model");
const CONSTANTS = require("../config/constants");

const generateCandidateId = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const addCandidate = (req: any, res: any, next: any) => {
  let data = req.body;
  if (req.file) {
    data.photo = req.file.filename;
  }
  data.candidate_id = generateCandidateId();
  try {
    let candidate = new Candidate(data);
    candidate.save();
    res.json({ msg: "Candidate Added Successfully", result: candidate });
  } catch (error) {
    res.json({ msg: "Error adding candidate" });
  }
};

const listAllCandidates = async (req: any, res: any, next: any) => {
  try {
    let candidates = await Candidate.find({}).populate('election').populate('party').populate({path:'voting_area'}).sort('voting_area election -count')
    res.json({ msg: "All candidates fetched", result: candidates });
  } catch (error) {
    res.json({ msg: "Error listing candidate" });
  }
};

const fetchCandidateById = async (req: any, res: any, next: any) => {
  let data = req.body;
  try {
    let candidate = await Candidate.findOne({ _id: req.params.id })
      .populate("election")
      .populate("party")
      .populate("voting_area");
    if (candidate["photo"]) {
      candidate["photo"] = CONSTANTS.host + candidate["photo"];
    }
    if (candidate["candidate_symbol"]) {
      candidate["candidate_symbol"] =
        CONSTANTS.host + candidate["candidate_symbol"];
    }
    res.json({ msg: "Candidate fetched", result: candidate });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching candidate" });
  }
};

export {};
module.exports = { addCandidate, listAllCandidates, fetchCandidateById };
