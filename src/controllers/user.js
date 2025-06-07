const bcrypt = require("bcryptjs");
const prisma = require("../../configs/prismaClient");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
});

module.exports = {
  createUser,
};
