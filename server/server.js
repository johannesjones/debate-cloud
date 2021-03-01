const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Claim = require("./models/debate");
const User = require("./models/user");
// connect to mongodb
const dbURI =
    "mongodb+srv://net-ninja:0815@cluster0.7ujqf.mongodb.net/debates?retryWrites=true&w=majority";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(process.env.PORT || 3001, () =>
            console.log("Debate cloud listening...")
        )
    )
    .catch((err) => console.log("Err in db-connection: ", err));

const compression = require("compression");
const path = require("path");

const cookieSession = require("cookie-session");
const secret = require("./secrets").sessionSecret;
const csurf = require("csurf");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

const cookieSessionMiddleware = cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    secret: secret,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.json());

app.post("/registration", async (req, res) => {
    const { first, last, email, password } = req.body;
    const user = new User({
        first: first,
        last: last,
        email: email,
        password: password,
    });
    try {
        const result = await user.save();
        console.log("User saved: ", result);
        res.json(result);
    } catch (error) {
        console.log("Error in registration: ", error);
    }
});

app.post("/add-claim", async (req, res) => {
    const { text, pro, userName, comment, parentClaimId } = req.body;
    const { userId } = req.session.userId;

    const claim = new Claim({
        text: text,
        parentClaimId: parentClaimId,
        pro: pro,
        comments: [
            {
                user: userName,
                body: comment,
            },
        ],
        authorId: userId,
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

app.get("/get-subClaims/:id", async (req, res) => {
    const { parentClaimId: id } = req.params;

    try {
        const result = await Claim.find({ parentClaimId: id });
        res.json(result);
    } catch (error) {
        console.log("Error in get-subClaims: ", error);
    }
});

app.get("/claim", async (req, res) => {
    const { claimId } = req.body;

    try {
        const result = await Claim.findById(claimId);
        res.json(result);
    } catch (error) {
        console.log("Error in claim: ", error);
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});
