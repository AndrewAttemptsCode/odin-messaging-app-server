const asyncHandler = require("express-async-handler");
const prisma = require("../../configs/prismaClient");

const getChat = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.params;
  const { id } = req.user;

  if (id !== Number(senderId) && id !== Number(receiverId)) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const existingChat = await prisma.chat.findFirst({
    where: {
      OR: [
        {
          AND: [
            { user1Id: Number(senderId) },
            { user2Id: Number(receiverId) },
          ],
        },
        {
          AND: [
            { user1Id: Number(receiverId) },
            { user2Id: Number(senderId) },
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
              avatarColor: true,
              usernameColor: true,
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
        user1Id: Number(senderId),
        user2Id: Number(receiverId),
      },
    })

    return res.json(newChat);
  }

});

const createMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { text, senderId } = req.body;

  const newMessage = await prisma.message.create({
    data: {
      text,
      senderId,
      chatId: Number(chatId),
    },
  })

  res.json({ msg: "success", newMessage });
})

const getUserChats = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { id } = req.user;

  if (id !== Number(userId)) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const chats = await prisma.chat.findMany({
    where: {
      OR: [
        { user1Id: Number(userId) },
        { user2Id: Number(userId) },
      ],
    },
    include: {
      user1: {
        select: {
          id: true,
          username: true,
          avatarColor: true,
          usernameColor: true,
        },
      },
      user2: {
        select: {
          id: true,
          username: true,
          avatarColor: true,
          usernameColor: true,
        },
      },
    },
  });

  res.json(chats);

});

module.exports = { getChat, createMessage, getUserChats };