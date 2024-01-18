const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleUsrSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    googleAssignedID: { type: String, required: true },
});

module.exports = mongoose.model("GoogleUser", googleUsrSchema);
