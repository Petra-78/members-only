const { Router } = require("express");
const router = Router();
const messagesController = require("../controllers/messagesController");
const { newMessageValidator } = require("../validators/messageValidator");

router.get("/", messagesController.renderMessageForm);
router.post("/", newMessageValidator, messagesController.postMessage);

module.exports = router;
