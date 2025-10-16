const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    firstName: {
        typeof: String
    },
    lastName: {
        typeof: String
    },
    emailId: {
        typeof: String
    },
    age: {
        typeof: Number
    },
    password: {
        typeof: String
    }
});

const userModel = mongoose.model('User', userScheme);

module.exports = userModel;