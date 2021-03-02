const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema(
    {
        first: { type: String, required: true },
        last: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model("User", usersSchema);

module.exports = User;