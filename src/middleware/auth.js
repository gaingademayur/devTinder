const adminAuth = (req, res, next) => {
    console.log("check admin auth");
    const token = "wabc";
    if(token == 'abc') {
        next();
    } else {
        res.send("authentication failed");
    }
}

const userAuth = (req, res, next) => {
    console.log("check user auth");
    const token = "wabc";
    if(token == 'abc') {
        next();
    } else {
        res.send("authentication failed");
    }
}

module.exports = {adminAuth, userAuth};