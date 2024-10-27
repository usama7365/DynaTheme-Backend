const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  LoginController,
  SignupController,
} = require("../controllers/auth/auth");

router.use(bodyParser.json());

router.post("/login", LoginController);
router.post("/signup", SignupController);

module.exports = router;
