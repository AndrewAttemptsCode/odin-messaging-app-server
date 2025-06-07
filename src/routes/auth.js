const { Router } = require("express");
const loginValidation = require("../middlewares/loginValidation");
const controllers = require("../controllers/index");

const router = Router();

router.post("/", loginValidation, controllers.auth.login);

module.exports = router;
