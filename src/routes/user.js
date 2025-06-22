const { Router } = require("express");
const controllers = require("../controllers/index");
const registerValidation = require("../middlewares/registerValidation");
const authenticateUser = require("../middlewares/authenticateUser");

const router = Router();

router.post("/", registerValidation, controllers.user.createUser);
router.get("/", controllers.user.getAllUsers);
router.put("/:userId", authenticateUser, controllers.user.updateUserSettings);

module.exports = router;
