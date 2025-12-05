const { body } = require("express-validator");
const pool = require("../db/pool");

const signupValidator = [
  body("username")
    .isEmail()
    .withMessage("Username must be a valid email")
    .custom(async (value) => {
      const { rows } = await pool.query(
        "SELECT id FROM users WHERE username = $1",
        [value]
      );

      if (rows.length > 0) {
        throw new Error("Username already exists");
      }

      return true;
    }),

  body("password")
    .isLength({ min: 5, max: 16 })
    .withMessage("Password must be 5–16 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

module.exports = { signupValidator };
