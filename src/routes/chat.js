const { Router } = require("express");
const controllers = require("../controllers/index");
const authenticateUser = require("../middlewares/authenticateUser");

const router = Router();

router.get("/:sender/:receiver", authenticateUser, controllers.chat.getChat);
router.post("/:chatId/messages", authenticateUser, controllers.chat.createMessage);

module.exports = router;
