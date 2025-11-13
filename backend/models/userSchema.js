const mongoose = require("mongoose");

const user = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  avtar: {
    type: String,
    default:
      "https://images.squarespace-cdn.com/content/v1/6242742320e8a26d18e9a6cf/1711078817762-AD3DMAC1RKPNQOYCXE17/CS-Team2-Avatar.png",
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  lastSeen: {
    type: String,
  },
  otp: {
    type: String,
  },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", user);
