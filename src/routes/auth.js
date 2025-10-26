const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);

        const { firstName, lastName, password, emailId} = req.body;

        const bcryptPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: bcryptPassword
        });

        await user.save();
        res.send("user added success");
    } catch(err) {
        res.status(400).send(err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if(!emailId) {
            throw new Error("please enter email id");
        }

        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("user not found");
        }

        const isPasswordValid = await user.verifyPassword(password);
        if(isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token);
            res.send("login success");
        } else {
            res.status(400).send("Invalid password")
        }
    } catch(err) {
        res.status(400).send(err.message);
    }
});

authRouter.get("/logout", async (req, res) => {
    try {
        res
            .cookie("token", null, {
                expires: new Date(Date.now())
            })
            .send("logout success");
    } catch(err) {
        res
            .status(400)
            .send(err.message);
    }
});

module.exports = authRouter;