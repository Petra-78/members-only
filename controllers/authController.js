const bcrypt = require("bcryptjs");
const passport = require("passport");
const pool = require("../db/pool");
const { ADD_USER } = require("../models/manageUsers");
const { validationResult } = require("express-validator");

async function signUp(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up-form", { errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await pool.query(ADD_USER, [
      req.body.first_name,
      req.body.last_name,
      req.body.username,
      hashedPassword,
      false,
      false,
    ]);

    const newUser = result.rows[0];
    console.log("NEW USER:", newUser);

    req.login(newUser, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  } catch (err) {
    return next(err);
  }
}

async function renderMembership(req, res, next) {
  console.log("MEMBERSHIP ROUTE HIT");
  res.render("membership-form");
}

async function postMembership(req, res, next) {
  const { code } = req.body;
  console.log(code);
}

module.exports = { signUp, renderMembership, postMembership };
