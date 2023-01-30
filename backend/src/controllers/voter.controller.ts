const Voter = require("../models/voter.model")
const CONSTANTS = require("../config/constants")

const generateVoterId = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

const addVoter = async (req: any, res: any, next: any) => {
    let data = req.body
    if (req.file) {
        data.photo = req.file.filename
    }
    try {
        let voter_idd = await Voter.findOne({ voter_id: data.voter_id })
        if (voter_idd) {
            res.status(401).json({ msg: `Voter with voter id ${data.voter_idd} already registered` })
        } else {
            let voter_details = { voter_id: generateVoterId(), full_name: data.full_name, phone: data.phone, dob: data.dob, gender: data.gender, photo: data.photo, voting_area: data.voting_area }
            let voter = new Voter(voter_details)
            voter.save()
            res.json({ msg: "Voter Added", result: voter })
        }

    } catch (error) {
        res.status(500).json({ msg: "Error adding voter" })
    }
}
const updateVoter = async (req: any, res: any, next: any) => {
    let id = req.params.id;
    let data = req.body;
    try {
        let result = await Voter.updateOne({voter_id:id}, { $set: data })
        res.status(200).json({ msg: `Updated id:${id}`, result: result })

    } catch (err) {
        res.status(500).json({ msg: 'Could not update voter' })
    }
}
const listVoters = async (req: any, res: any, next: any) => {
    try {
        let voters = await Voter.find({}).populate('voting_area')
        res.json({ msg: "Voters fetched successfully", result: voters })
    } catch (error) {
        res.status(500).json({ msg: "Error listing voters" })
    }
}

const getVoterById = async (req: any, res: any, next: any) => {
    let data = req.body
    try {
        let voter = await Voter.findOne({ voter_id: req.params.id }).populate('voting_area')
        if (voter['photo']) { voter['photo'] = CONSTANTS.host + voter['photo'] }
        res.json({ msg: "Voter fetched successfully", result: voter })

    } catch (error) {
        res.status(500).json({ msg: "Error fetching voter" })
    }
}

export { }
module.exports = { addVoter, listVoters, getVoterById, updateVoter }