const { body } = require("express-validator");
const prisma = require("../../configs/prismaClient");

const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Min length of 3 characters")
    .isLength({ max: 20 })
    .withMessage("Max length of 20 characters")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Letters and numbers only")
    .custom(async (username) => {
      try {
        const existingUsername = await prisma.user.findUnique({
          where: { username },
        });

        if (existingUsername) {
          throw new Error("Username already exists");
        }
        return true;
      } catch (error) {
        if (error.message === "Username already exists") throw error;
        throw new Error("Database query failed, please try again later");
      }
    }),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Minimum length of 8 characters"),

  body("confirmPassword")
    .trim()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password || confirmPassword === "") {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

module.exports = registerValidation;
