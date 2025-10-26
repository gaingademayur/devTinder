const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData, validateEditPassword } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send(user);
    } catch(ex) {
        res.status(400).send("something went wrong" + ex);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        validateEditProfileData(req);

        loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();

        res.json({
            message: "update success",
            data: loggedInUser
        });
    } catch(err) {
        res.status(400).send(err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        validateEditPassword(req);

        const password = req.body.password;
        // const bcryptPassword = await bcrypt.hash(password, 10);
// console.log(bcryptPassword + ' ' + req.user.password);
        const newPassword = req.body.newPassword;

        const user = await User.findById(req.user._id);

        const checkCurrentPassword = await user.verifyPassword(password)
        if(checkCurrentPassword) {
            if(!validator.isStrongPassword(newPassword)) {
                throw new Error('Invalid new password. it should be a strong password')
            }

            const bcryptNewPassword = await bcrypt.hash(newPassword, 10);
            loggedInUser = req.user;
            loggedInUser.password = bcryptNewPassword;
            await loggedInUser.save();

            res.send("update password success");
        }
        res.status(400).send("please enter correct old password");
    } catch(err) {
        res.status(400).send(err.message);
    }
});

module.exports = profileRouter;