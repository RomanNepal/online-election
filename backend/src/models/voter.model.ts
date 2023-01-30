const mongoose = require("mongoose")
const VoterSchema = mongoose.Schema({
    voter_id: {
        type: String
    },
    full_name: {
        type: String
    },
    phone: {
        type: String
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    photo: {
        type: String
    },
    voting_area: {
        type: mongoose.Types.ObjectId,
        ref: "VotingArea"
    },
    has_voted: {
        type: Boolean,
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})

const Voter = mongoose.model("voter", VoterSchema)
module.exports = Voter
export { }
