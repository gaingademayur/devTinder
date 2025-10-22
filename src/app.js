const express = require("express");
const {adminAuth, userAuth} = require("./middleware/auth");
require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = new express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch(ex) {
        res.status(400).send("something went wrong" + ex);
    }
});

app.get("/user", async (req, res) => {
    try {
        const userId = req.body._id;

        const user = await User.findOne({_id: userId});
        if(!user) {
            res.status(404).send("no user found");
        }
        else {
            res.send(user)
        }
    } catch(ex) {
        res.send("something went wrong");
    }
    res.send("user api");
});

app.get("/feed", async (req, res) => {
    try {

        const user = await User.find();
        if(user.length == 0) {
            res.status(404).send("no user found");
        }
        else {
            res.send(user)
        }
    } catch(ex) {
        res.send("something went wrong");
    }
    res.send("user api");
});

app.delete("/user", async (req, res) => {
    try {
        const userId = req.body._id;

        const user = await User.findByIdAndDelete({_id: userId});
        if(!user) {
            res.status(404).send("no user found");
        }
        else {
            res.send(user)
        }
    } catch(ex) {
        res.send("something went wrong");
    }
    res.send("user api");
});

app.patch("/update/:userId", async (req, res) => {
    try {
        const userId = req.params?.userId;

        const ALLOWED_UPDATES = [
            "age",
            "firstName",
            "lastName"
        ];

        const allowedData = Object.keys(req.body).every((key) => ALLOWED_UPDATES.includes(key));

        if(!allowedData) {
            throw new Error("update not allowed");
        }

        const user = await User.findByIdAndUpdate(userId, req.body, {runValidators: true});
        user.save();
        res.send("user updated success");
    } catch(err) {
        res.status(400).send(err.message);
    }
});

app.listen(3000, () => {
    console.log("server is successfully listening on port 3000.");
});