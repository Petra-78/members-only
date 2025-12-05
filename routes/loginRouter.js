const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/", authController.postLogin);

module.exports = router;
