const crypto = require("crypto");
const User = require("../models/User.model");

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.pbkdf2(password, salt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve({ salt, hashedPassword: key.toString("hex") });
    }
    });
  });
};

exports.SignupController = async (req, res) => {
  const {
    email,
    FullName,
    password,
    plan,
    dateOfBirth,
    paymentMethodId,
    MaxTeamMembersCount,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const { salt, hashedPassword } = await hashPassword(password);

    const role = plan === "team" ? "admin" : "member";

    const user = new User({
      email,
      FullName,
      password: { salt, hashedPassword },
      plan,
      role,
      dateOfBirth,
      paymentMethodId,
      timestamp: new Date(),
    });

  
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during user creation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};
