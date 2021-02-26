const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debatesSchema = new Schema({
    text: String,
    parentClaim: Boolean,
    pro: Boolean,
    totalRatings: Number,
    countRatings: [
        {
            countOnes: Number,
            countTwos: Number,
            countThrees: Number,
            countFours: Number,
        },
    ],
    averageRating: Number,
    comments: [
        {
            user: String,
            body: String,
            date: Date(),
        },
    ],
    authorId: Number,
});

const Claim = mongoose.model("Claim", debatesSchema);

module.exports = Claim;
