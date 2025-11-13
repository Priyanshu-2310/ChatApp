const mongoose = require('mongoose')
const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    content: {
        type: String,
        required: true,
    },
    messageType: {
        type: String,
        enum: ["text", "image", "file"],
        default: "text"
    },

    seenBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
})

module.exports = mongoose.model("Message", messageSchema);