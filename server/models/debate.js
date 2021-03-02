const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debatesSchema = new Schema(
    {
        parentClaimId: Number,
        pro: Boolean,
        text: { type: String, required: true },
        authorId: Number,
        comments: [ {
            body: String,
            authorId: Number
        }]
    },
    { timestamps: true }
);

const Claim = mongoose.model("Claim", debatesSchema);

module.exports = Claim;