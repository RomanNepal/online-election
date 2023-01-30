const mongoose = require("mongoose")
const PartySchema = mongoose.Schema({
    party_name: {
        type: String
    },
    party_symbol: {
        type: String
    },
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})

const Party = mongoose.model("Party", PartySchema)
module.exports = Party
export { }