const mongoose = require("mongoose");
const validator = require("validator");

const userScheme = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email id " . value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error('Invalid password. it should be a strong password')
            }
        },
    }
},
{timestamps: true});

const userModel = mongoose.model('User', userScheme);

module.exports = userModel;