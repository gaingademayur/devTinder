

const validateSignUpData = (req) => {
    if(!req.body.firstName || req.body.firstName == '' || !req.body.lastName || req.body.lastName == '') {
        throw new Error("Please enter the name");
    }
}

module.exports = { validateSignUpData }