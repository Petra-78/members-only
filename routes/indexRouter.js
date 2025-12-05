const { Router } = require("express");
const router = Router();
const indexController = require("../controllers/indexController");
const authController = require("../controllers/authController");

router.get("/", indexController.renderHomepage);
router.get("/membership", authController.renderMembership);

module.exports = router;
