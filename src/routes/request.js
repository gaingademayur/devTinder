const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

requestRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch(ex) {
        res.status(400).send("something went wrong" + ex);
    }
});

module.exports = requestRouter;