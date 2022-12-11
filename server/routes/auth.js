const express = require("express");
const { body } = require("express-validator");

const authControler = require("../controllers/auth")

const User = require("../models/user");

const router = express.Router();

router.put("/signup", [
  body("email")
    .isEmail()
    .withMessage("not email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email already exsits!");
        }
      });
    })
    .normalizeEmail(),
    body("password").trim().isLength({min: 5}),
    body("name").trim().not().isEmpty()
], authControler.signup);

router.post("/login", authControler.login)

module.exports = router;
