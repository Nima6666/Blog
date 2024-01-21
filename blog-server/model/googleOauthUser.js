const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleUsrSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String, required: true },
});

module.exports = mongoose.model("GoogleUser", googleUsrSchema);
