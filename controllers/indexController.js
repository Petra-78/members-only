const pool = require("../db/pool");
const { JOIN_TABLES } = require("../models/manageUsers");
const { validationResult } = require("express-validator");

async function renderHomepage(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("new-message", { errors: errors.array() });
  }
  const { rows: users } = await pool.query(JOIN_TABLES);
  console.log(users);
  res.render("index", { users, errors });
}

module.exports = { renderHomepage };
