const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 20
    },
    emailId: {
        type: String,
        unique: true,
        lowercase: true
    },
    age: {
        type: Number,
        min: 18
    },
    password: {
        type: String,
        minLength: 6,
        maxLength: 10
    }
},
{timestamps: true});

const userModel = mongoose.model('User', userScheme);

module.exports = userModel;