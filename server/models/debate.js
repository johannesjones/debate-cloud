const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debatesSchema = new Schema(
    {
        parentClaimId: String,
        type: String,
        text: { type: String, required: true },
        authorId: String,
        comments: [
            {
                commentText: String,
                authorId: String,
                first: String,
                last: String,
                createdAt: { type: String, default: Date },
            },
        ],
    },
    { timestamps: true }
);

const Claim = mongoose.model("Claim", debatesSchema);

module.exports = Claim;
