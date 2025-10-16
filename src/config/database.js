const mongoose = require("mongoose");

const connect = async () => {
    await mongoose.connect("mongodb+srv://awsmayurgaingade:C1Z3j2yMZicTRMHr@mongodbtest.3wde7ic.mongodb.net/devTinder");
};

connect().then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log("connection to database failed " . err);
})