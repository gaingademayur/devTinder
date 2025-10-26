const express = require("express");
const {adminAuth, userAuth} = require("./middleware/auth");
require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const app = new express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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

app.listen(3000, () => {
    console.log("server is successfully listening on port 3000.");
});