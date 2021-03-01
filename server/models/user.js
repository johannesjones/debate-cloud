const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema(
    {
        first: String,
        last: String,
        email: { type: String, required: true, unique: true },
        password: String,
    },
    { timestamps: true }
);

const User = mongoose.model("User", usersSchema);

module.exports = User;
