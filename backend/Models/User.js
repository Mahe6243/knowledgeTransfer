const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 40,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 40,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    addresses: [{
        type: String
    }],
    previousOrders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Order"
    }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);