const express = require("express");
const {adminAuth, userAuth} = require("./middleware/auth");
require("./config/database");
const User = require("./models/user");

const app = new express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
    const user = new User(req.body);
    await user.save();
    res.send("user added success");
    } catch(ex) {
        res.send(ex);
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