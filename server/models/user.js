const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema(
    {
        first: String,
        last: String,
        email: String,
        password: Number,
        image: String
    },
    { timestamps: true }
);

const User = mongoose.model("User", usersSchema);

module.exports = User;
