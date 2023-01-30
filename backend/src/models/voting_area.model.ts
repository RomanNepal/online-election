const mongoose = require("mongoose")
const VotingAreaSchema = mongoose.Schema({
    area_name: {
        type: String
    },
    area_province: {
        type: String
    },
    area_district: {
        type: String
    },
    total_voters: {
        type: String
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})

const VotingArea = mongoose.model("VotingArea", VotingAreaSchema)
module.exports = VotingArea
export { }