const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "MAYUR", {expiresIn: '1d'});

    return token;
}

userSchema.methods.verifyPassword = async function(passwordInputByUser) {
    const user = this;
    const verification = await bcrypt.compare(passwordInputByUser, user.password);

    return verification;
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;