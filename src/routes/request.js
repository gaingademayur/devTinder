const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/profile/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user;
        const status = req.params.status;

        // check valid status
        const allowedStatus = ["interested", "ignored"];
        const validStatus = allowedStatus.includes(status);
        if(!validStatus) {
            throw new Error("Invalid status");
        }

        const toUserId = req.params.toUserId;
        const toUser = await User.findById(toUserId);
        if(!toUser) {
            throw new Error("user not found");
        }

        // check request exists
        const checkRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if(checkRequest) {
            throw new Error("request already exists");
        }

        const connectionRequestObj = await new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        await connectionRequestObj.save();

        res.json({message: "success"});
    } catch(ex) {
        res.status(400).json({message: "something went wrong " + ex.message});
    }
});

module.exports = requestRouter;