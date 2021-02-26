const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Claim = require("./models/debate");
// connect to mongodb
const dbURI =
    "mongodb+srv://net-ninja:0815@cluster0.7ujqf.mongodb.net/debates?retryWrites=true&w=majority";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT || 3001))
    .catch((err) => console.log("Err in db-connection: ", err));

const compression = require("compression");
const path = require("path");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/add-claim", async (req, res) => {
    const claim = new Claim({
        text: "Vegans are good people",
        parentClaim: false,
        pro: true,
        totalRatings: 0,
        countRatings: [
            {
                countOnes: 0,
                countTwos: 0,
                countThrees: 0,
                countFours: 0,
            },
        ],
        averageRating: 0,
        comments: [
            {
                user: "Mikhail Ratner",
                body: "I don't think so",
            },
        ],
        authorId: 2,
    });

    try {
        const result = await claim.save();
        console.log("results in add-claim: ", result);
        res.json(result);
    } catch (error) {
        console.log("Error ins save claim: ", error);
    }
});

app.get("/all-claims", async (req, res) => {
    try {
        const result = await Claim.find();
        console.log("Rows in all-claims: ", result);
        res.json(result);
    } catch (error) {
        console.log("Error in all-claims: ", error);
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});
