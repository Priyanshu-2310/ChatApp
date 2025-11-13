const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema({

    chatType: {
        type: String,
        enum: ["group"],
        default: "group"
    },

    groupName: {
        type: String,
        required: true
    },

    groupImage: {
        type: String,
        default: ""
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("GroupChat", groupChatSchema);
