import { ObjectId } from "mongodb"

const mongoose = require("mongoose")
const castVoteSchema = mongoose.Schema({
    election: {
        type: mongoose.Types.ObjectId,
        ref: "Election",
        default: new ObjectId('000000000000')

    },
    party: {
        type: mongoose.Types.ObjectId,
        ref: 'Party',
        default: new ObjectId('000000000000')
    },
    candidate: {
        type: mongoose.Types.ObjectId,
        ref: "candidate",
        default: new ObjectId('000000000000')
    },
    voting_area: {
        type: mongoose.Types.ObjectId,
        ref: "VotingArea",
        default: new ObjectId('000000000000')
    },
    
    vote_count: {
        type: Date
    },
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})

const CastVote = mongoose.model("castVote", castVoteSchema)
module.exports = CastVote