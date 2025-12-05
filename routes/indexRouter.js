const { Router } = require("express");
const router = Router();
const indexController = require("../controllers/indexController");
const {
  renderMembership,
  postMembership,
  isAuthenticated,
  renderAdmin,
  postAdmin,
  deleteMessage,
  isAdmin,
} = require("../controllers/authController");

router.get("/", indexController.renderHomepage);
router.get("/membership", isAuthenticated, renderMembership);
router.post("/membership", isAuthenticated, postMembership);

router.get("/admin", isAuthenticated, renderAdmin);
router.post("/admin", isAuthenticated, postAdmin);

router.post("/delete/:id", isAuthenticated, isAdmin, deleteMessage);

module.exports = router;
