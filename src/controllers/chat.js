const asyncHandler = require("express-async-handler");
const prisma = require("../../configs/prismaClient");

const getChat = asyncHandler(async (req, res) => {
  const { sender, receiver } = req.params;
  const { id } = req.user;

  if (id !== Number(sender) && id !== Number(receiver)) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const existingChat = await prisma.chat.findFirst({
    where: {
      OR: [
        {
          AND: [
            { user1Id: Number(sender) },
            { user2Id: Number(receiver) },
          ],
        },
        {
          AND: [
            { user1Id: Number(receiver) },
            { user2Id: Number(sender) },
          ],
        },
      ],
    },
    include: {
      messages: {
        include: {
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  })

  if (existingChat) {
    return res.json(existingChat);
  }

  if (!existingChat) {
    const newChat = await prisma.chat.create({
      data: {
        user1Id: Number(sender),
        user2Id: Number(receiver),
      },
    })

    return res.json(newChat);
  }

});

const createMessage = (req, res) => {
  const { chatId } = req.params;
  const { text, senderId, receiverId } = req.body;
  console.log(`chat id: ${chatId}, sender id: ${senderId}, receiver id: ${receiverId}, text: ${text}`);
  res.json({ msg: "success" });
}

module.exports = { getChat, createMessage };