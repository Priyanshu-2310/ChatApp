const express = require("express");
const router = express.Router();
const userModel = require("../models/userSchema");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

router.post("/signup", async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      return res.send("User Already exist");
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    const msg = {
      to: email,
      from: "priyanshuverma7245@gmail.com",
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}`,
      html: `<h1>Your OTP is: ${code}</h1>`,
    };

    await sgMail.send(msg);

    await userModel.create({
      name,
      email,
      password,
      otp: code,
      otpExpire: Date.now() + 5 * 60 * 1000,
    });

    console.log(code)
    return res.json({ message: "OTP sent!"});

  } catch (err) {
    console.log("ERROR = ", err);
    return res.status(500).json({ error: "Email not sent" });
  }
});

router.post("/verifyotp", async function (req, res) {
  const { otp, email } = req.body;

  if (!otp || !email) {
    return res.send("otp is required");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  if (user.otp != otp) {
    return res.status(400).json({ error: "Incorrect OTP" });
  }
  // check expiration
  if (user.otpExpire < Date.now()) {
    return res.status(400).json({ error: "OTP expired" });
  }
  user.isVerified = true;
  user.otp = null;
  user.otpExpire = null;

  await user.save();

  return res.json({ message: "OTP Verified Successfully!" });
});

module.exports = router;
