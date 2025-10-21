const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        if(!req.cookies.token) {
            throw new Error("Token not found");
        }

        const cookieData = jwt.verify(req.cookies.token, "MAYUR");

        const {_id} = cookieData;
        if(!_id) {
            throw new Error("Id not found");
        }

        const user = await User.findById(_id)

        if(!user) {
            throw new Error("invalid token");
        }

        req.user = user;
        next();
    } catch(err) {
        res.status(404).send("something went wrong" + err);
    }
}

module.exports = {  userAuth};