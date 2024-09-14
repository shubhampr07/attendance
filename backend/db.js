const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    checkInTime : {
        type: Date,
        default: Date.now
    },
    checkOutTime: {
        type: Date,
        default: null
    }
});


// const accountSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     balance : {
//         type: Number,
//         required: true,
//     },
// });


// const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    // Account,
}