const express = require("express");
const {adminAuth, userAuth} = require("./middleware/auth");

const app = new express();

app.use("/admin", adminAuth);

app.get("/admin/getAddUsers", (req, res) => {
    res.send("all data");
});

app.post("/admin/addUser", (req, res) => {
    res.send("user added success");
});

app.use("/user", userAuth, (req, res) => {
    res.send("user api");
});

app.listen(3000, () => {
    console.log("server is successfully listening on port 3000.");
});