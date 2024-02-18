const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsrSchema = new Schema({
    _id: { type: String },
    oAuth: { type: Boolean, default: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String },
    password: {
        type: String,
        required: function () {
            return !this.oAuth;
        },
    },
});

module.exports = mongoose.model("User", UsrSchema);
