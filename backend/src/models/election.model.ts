const mongoose = require("mongoose")
const ElectionSchema = mongoose.Schema({
    election_name: {
        type: String
    },
    election_year: {
        type: Date
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})

const Election = mongoose.model("Election", ElectionSchema)
module.exports = Election
export { }