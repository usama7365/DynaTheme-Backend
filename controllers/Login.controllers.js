const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const crypto = require("crypto");

exports.LoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password || typeof user.password !== "object") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { salt, hashedPassword } = user.password;
    const inputHashedPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    const isPasswordValid = inputHashedPassword === hashedPassword;

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
      message: "Login successful",
      accessToken,
      user_id: user._id,
      plan: user.plan,
      FullName: user.FullName,
      organizationId: user.organizationId,

      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};
