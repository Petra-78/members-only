const { Router } = require("express");
const router = Router();
const messagesController = require("../controllers/messagesController");
const { newMessageValidator } = require("../validators/messageValidator");
const { isAuthenticated } = require("../controllers/authController");

router.get("/", isAuthenticated, messagesController.renderMessageForm);
router.post(
  "/",
  isAuthenticated,
  newMessageValidator,
  messagesController.postMessage
);

module.exports = router;
