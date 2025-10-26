const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values : ['interested', 'ignored', 'rejected', 'accepted'],
            message: ['invalid status value']
        }
    }
  }, 
  { timestamps: true }
);

connectionRequestSchema.pre("save", function (next) {
    connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(new Error("cannot send request to your self"));
    }

    next();
});

ConnectionRequestModel = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequestModel;