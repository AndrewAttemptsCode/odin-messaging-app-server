const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const prisma = require("../../configs/prismaClient");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1hr" });

  res.json(token);
});

module.exports = login;
