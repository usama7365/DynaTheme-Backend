const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User.model");
const axios = require("axios");

exports.LoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password incorrect" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successfully",
      accessToken,
      user_id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

exports.SignupController = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      name,
      password: hashedPassword,
      timestamp: new Date(),
    });

    await user.save();

    // Send a welcome email after successful signup
    await axios.post(`${process.env.WELLCOME_MAIL}/send-email`, {
      email,
      name,
      message: "Welcome to Dynatheme CMS! Thank you for signing up.",
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during user creation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};
