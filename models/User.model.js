const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    FullName: String,
    password: {
      salt: String,
      hashedPassword: String,
    },
    dateOfBirth: Date,
    resetToken: String,
    resetTokenExpiration: Date,
    plan: { type: String, enum: ["plus", "team"] },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    paymentMethodId: String,
    adminUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    invitationToken: String,
    inviteTokenExpiration: Date,
    invitationAccepted: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("User", UserSchema);
