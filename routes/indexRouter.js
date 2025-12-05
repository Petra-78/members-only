const { Router } = require("express");
const router = Router();
const indexController = require("../controllers/indexController");
const {
  renderMembership,
  postMembership,
  isAuthenticated,
} = require("../controllers/authController");

router.get("/", indexController.renderHomepage);
router.get("/membership", isAuthenticated, renderMembership);
router.post("/membership", isAuthenticated, postMembership);

module.exports = router;
