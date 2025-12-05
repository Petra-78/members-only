const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");
const { signupValidator } = require("../validators/authValidator");

router.get("/", (req, res) => res.render("sign-up-form", { errors: [] }));
router.post("/", signupValidator, authController.signUp);

module.exports = router;
