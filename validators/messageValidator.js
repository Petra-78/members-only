const { body } = require("express-validator");

const newMessageValidator = [
  body("title")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be bewteen 1 and 100 charachters long"),

  body("message")
    .isLength({ min: 5, max: 400 })
    .withMessage("Message must be bewteen 1 and 400 characters long"),
];

module.exports = { newMessageValidator };
