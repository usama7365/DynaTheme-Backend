const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpiration: Date,
    invitationToken: String,
    inviteTokenExpiration: Date,
    invitationAccepted: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("User", UserSchema);
