
const mongoose = require("mongoose")
const AdminSchema = mongoose.Schema({
    full_name: {
        type: String
    },
    user_name: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})

const Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin
export { }
