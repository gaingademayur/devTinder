const express = require("express");
const {adminAuth, userAuth} = require("./middleware/auth");
require("./config/database");
const User = require("./models/user");

const app = new express();

app.post("/signup", async (req, res) => {
    try {
    const user = new User({
        firstName: "Mayur",
        lastName: "Gaingade",
        emailId: "mayur@gmail.com",
        age: "27",
        password: "mayur@123"
    });
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