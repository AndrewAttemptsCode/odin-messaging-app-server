const { body } = require("express-validator");

const loginValidation = [
  body("username")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Username is required"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),
]

module.exports = loginValidation;