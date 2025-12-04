const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const { ADD_USER } = require("../models/manageUsers");

async function signUp(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(ADD_USER, [req.body.username, hashedPassword]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

module.exports = { signUp };
