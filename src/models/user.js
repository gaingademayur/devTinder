const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    age: {
        type: Number
    },
    password: {
        type: String
    }
});

const userModel = mongoose.model('User', userScheme);

module.exports = userModel;