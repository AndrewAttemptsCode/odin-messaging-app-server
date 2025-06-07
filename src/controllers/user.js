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

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
    },
    orderBy: { username: "asc" },
  });

  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  res.json(users);
});

module.exports = {
  createUser,
  getAllUsers,
};
