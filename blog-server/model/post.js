const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [
        {
            name: { type: String, required: true },
            comment: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model("Post", blogSchema);
