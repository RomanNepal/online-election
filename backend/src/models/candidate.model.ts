const mongoose = require("mongoose")
const CandidateSchema = mongoose.Schema({
    candidate_id: {
        type: String
    },
    full_name: {
        type: String
    },
    gender: {
        type: String
    },
    photo: {
        type: String
    },
    candidate_symbol: {
        type: String
    },
    voting_area: {
        type: mongoose.Types.ObjectId,
        ref: "VotingArea"
    },
    election: {
        type: mongoose.Types.ObjectId,
        ref: "Election"
    },
    party: {
        type: mongoose.Types.ObjectId,
        ref: "Party"
    },
    count:{
        type:Number,
        default:0,
    }

}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})

const Candidate = mongoose.model("candidate", CandidateSchema)
module.exports = Candidate
export { }