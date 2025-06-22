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

  res.json({ msg: "success" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      avatarColor: true,
      usernameColor: true,
    },
    orderBy: { username: "asc" },
  });

  if (users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  res.json(users);
});

const updateUserSettings = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { avatarColor, usernameColor } = req.body;
  const { id } = req.user;

  if (id !== Number(userId)) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      avatarColor,
      usernameColor,
    },
  });

  res.json({ message: "User settings updated" });
});

module.exports = {
  createUser,
  getAllUsers,
  updateUserSettings,
};
