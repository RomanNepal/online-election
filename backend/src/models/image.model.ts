const mongoose = require("mongoose")
const image = mongoose.Schema({

    title: {
        type: String
    },

    uploaded_by: {
        type: mongoose.Types.ObjectId,
        ref: "Admin"
    }

}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
})

const Image = mongoose.model("Image", image);
export { }
module.exports = Image
