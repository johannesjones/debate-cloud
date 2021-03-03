const express = require("express");
const app = express();

const server = require("http").Server(app);

const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

const mongoose = require("mongoose");
const User = require("./models/user");
const Claim = require("./models/debate");
// connect to mongodb
const dbURI =
    "mongodb+srv://net-ninja:0815@cluster0.7ujqf.mongodb.net/debates?retryWrites=true&w=majority";
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() =>
        server.listen(process.env.PORT || 3001, () =>
            console.log("Debate cloud listening...")
        )
    )
    .catch((err) => console.log("Err in db-connection: ", err));

const compression = require("compression");
const path = require("path");

const { hash, compare } = require("./bc");

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

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.json());

app.post("/registration", async (req, res) => {
    const { first, last, email, password } = req.body;

    if (first && last && email && password) {
        const hashedPw = await hash(password);
        const user = new User({
            first: first,
            last: last,
            email: email,
            password: hashedPw,
        });

        try {
            const result = await user.save();
            console.log("User saved: ", result);
            req.session.userId = result._id;
            res.json({ success: true, data: result });
        } catch (error) {
            console.log("Error in registration: ", error);
        }
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        try {
            const result = await User.findOne({ email: email });
            console.log("Result in login: ", result);
            if (compare(password, result.password)) {
                req.session.userId = result._id;
                console.log("REQ SESSION USER ID", req.session.userId);
                res.json({ success: true, data: result });
            } else {
                console.log("err in password");
                res.json({ success: false });
            }
        } catch (error) {
            console.log("Error in find User by Email: ", error);
        }
    }
});

app.post("/add-claim", async (req, res) => {
    console.log("REQ BODY ADD CLAIM: ", req.body);
    const { text } = req.body.values;
    const { id, type } = req.body;
    const { userId } = req.session;

    if (id && type) {
        const claim = new Claim({
            parentClaimId: id,
            type: type,
            text: text,
            authorId: userId,
        });
        try {
            const result = await claim.save();
            console.log("results in add-claim with id&type: ", result);
            res.json(result);
        } catch (error) {
            console.log("Error ins save claim with id&type: ", error);
        }
    } else {
        const claim = new Claim({
            text: text,
            authorId: userId,
        });
        try {
            const result = await claim.save();
            console.log("results in add-claim without id&type: ", result);
            res.json(result);
        } catch (error) {
            console.log("Error ins save claim without id&type: ", error);
        }
    }
});

app.get("/delete-claim/:id", async (req, res) => {
    try {
        const result = await Claim.findOneAndRemove({ _id: req.params.id });
        res.json({ success: true, data: result });
    } catch (error) {
        console.log("Error in removing Claim: ", error);
    }
});

app.post("/add-comment/:id", async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const { userId } = req.session.userId;

    try {
        const result = await Claim.findOneAndUpdate(
            { _id: id },
            { $set: { comments: [{ body: text, authorId: userId }] } },
            { upsert: true }
        );
        res.json({ success: true, data: result });
    } catch (error) {
        console.log("Error in updating Claim with adding comment: ", error);
    }
});

app.get("/delete-comment/:id", async (req, res) => {
    try {
        const result = await Claim.findOneAndRemove({ _id: req.params.id });
        res.json({ success: true, data: result });
    } catch (error) {
        console.log("Error in removing Claim: ", error);
    }
});

app.get("/all-mainClaims", async (req, res) => {
    try {
        const result = await Claim.find({ parentClaimId: { $exists: false } });
        // console.log("Rows in all-claims: ", result);
        res.json(result);
    } catch (error) {
        console.log("Error in all-claims: ", error);
    }
});

app.get("/get-subClaims/:id", async (req, res) => {
    try {
        const result = await Claim.find({ parentClaimId: req.params.id });
        // console.log("Result get-subClaims: ", result);
        res.json(result);
    } catch (error) {
        console.log("Error in get-subClaims: ", error);
    }
});

app.get("/claim/:id", async (req, res) => {
    try {
        const result = await Claim.findById({ _id: req.params.id });
        console.log("Result in clain by id: ", result);
        res.json(result);
    } catch (error) {
        console.log("Error in claim: ", error);
    }
});

app.get("/session-status", async (req, res) => {
    if (req.session.userId) {
        res.json({ userloggedIn: true });
    } else {
        res.json({ userloggedIn: false });
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

io.on("connection", async (socket) => {
    // socket obj that is passed to callback represents network connection
    // b/w client server
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;
    console.log("Socket req session: ", socket.request.session);

    console.log(`socket with id ${socket.id} is now connected`);
    console.log(`socket UserId: ${userId}`);

    if (!userId) {
        return socket.disconnect(true);
    }

    // try {
    //     const result = await Comment.find({ parentClaimId: id });
    //     console.log("Rows: ", rows);
    //     socket.emit("mostRecentMsgs", result.reverse());
    // } catch (error) {
    //     console.log("ERR: ", error);
    // }

    socket.on("sendComment", async (data) => {
        console.log("Data in sendComment: ", data);
        const { commentText, claimId } = data;

        try {
            if (commentText) {
                const result1 = await User.findById({ _id: userId});
                console.log('Result 1: ', result1);
                const result = await Claim.findOneAndUpdate(
                    { _id: claimId },
                    {
                        $push: {
                            comments: {
                                commentText: commentText,
                                authorId: userId,
                                first: result1.first,
                                last: result1.last,
                                createdAt: new Date()
                            },
                        },
                    },
                    { new: true }
                );
                console.log("Result: ", result);
                //SHOULD WE EMIT SOMETHING HERE? SO WE CAN AUTOMATICALLY SEE THE COMMENT WE HAVE SENT
                // const comment = {
                // };
                io.emit("commentUpdate", result);
            }
        } catch (error) {
            console.log("Err in addMsg: ", error);
        }
    });
});

// app.post("/add-subClaim/:id", async (req, res) => {
//     const { id } = req.params;
//     const { text, pro } = req.body;
//     const { userId } = req.session.userId;

//     const claim = new Claim({
//         parentClaimId: id,
//         text: text,
//         pro: pro,
//         authorId: userId,
//     });

//     try {
//         const result = await claim.save();
//         console.log("results in add-claim: ", result);
//         res.json(result);
//     } catch (error) {
//         console.log("Error ins save claim: ", error);
//     }
// });
