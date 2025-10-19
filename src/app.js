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

// app.use("/user", userAuth, (req, res) => {
//     res.send("user api");
// });

app.listen(3000, () => {
    console.log("server is successfully listening on port 3000.");
});