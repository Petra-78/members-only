const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
