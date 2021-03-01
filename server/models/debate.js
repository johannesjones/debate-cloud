const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debatesSchema = new Schema(
    {
        text: String,
        authorId: Number,
    },
    { timestamps: true }
);

const Claim = mongoose.model("Claim", debatesSchema);

module.exports = Claim;
