const { Router } = require("express");
const controllers = require("../controllers/index");
const registerValidation = require("../middlewares/registerValidation");

const router = Router();

router.post("/", registerValidation, controllers.user.createUser);
router.get("/", controllers.user.getAllUsers);

module.exports = router;
