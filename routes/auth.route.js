const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { LoginController } = require("../controllers/Login.controllers");
const { SignupController } = require("../controllers/signup.controller");

router.use(bodyParser.json());

router.post("/login", LoginController);
router.post("/signup", SignupController);

module.exports = router;
