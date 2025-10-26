const validateSignUpData = (req) => {
    if(!req.body.firstName || req.body.firstName == '' || !req.body.lastName || req.body.lastName == '') {
        throw new Error("Please enter the name");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "age"
    ];
    const isEditAllowed = Object.keys(req.body).every((key) => allowedEditFields.includes(key));

    if(!isEditAllowed) {
        throw new Error("Invalid edit request");
    }
};

const validateEditPassword = (req) => {
    const passwordFields = [
        "password",
        "newPassword",
    ];

    const isPasswordEditAllowed = Object.keys(req.body).every((key) => passwordFields.includes(key));

    if(!isPasswordEditAllowed) {
        throw new Error("Invalid edit password request");
    }
}

module.exports = { validateSignUpData, validateEditProfileData, validateEditPassword }