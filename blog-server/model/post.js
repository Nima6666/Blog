const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    comment: [
        {
            user: { type: Schema.Types.ObjectId, ref: "Users" },
            text: { type: String, required: true },
        },
    ],
});

blogSchema.virtual("url").get(function () {
    return `/blogs/${this._id}`;
});

module.exports = mongoose.model("Post", blogSchema);
