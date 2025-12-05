const bcrypt = require("bcryptjs");
const passport = require("passport");
const pool = require("../db/pool");
const { ADD_USER } = require("../models/manageUsers");
const { validationResult } = require("express-validator");

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

function isAdmin(req, res, next) {
  if (req.user && req.user.admin) return next();
  res.redirect("/");
}

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
  res.render("membership-form");
}

async function postMembership(req, res, next) {
  const { code } = req.body;
  console.log(code);

  if (code === process.env.MEMBER_SECRET) {
    await pool.query("UPDATE users SET membership_status = true WHERE id=$1", [
      req.user.id,
    ]);
    res.redirect("/");
  } else {
    const errors = ["Wrong secret code"];
    res.render("membership-form", { errors });
  }
}

async function renderAdmin(req, res, next) {
  console.log("ADMIN ROUTE HIT");
  res.render("admin-form");
}

async function postAdmin(req, res, next) {
  const { code } = req.body;
  console.log(code);

  if (code === process.env.ADMIN_SECRET) {
    await pool.query("UPDATE users SET admin = true WHERE id=$1", [
      req.user.id,
    ]);
    res.redirect("/");
  } else {
    const errors = ["Wrong secret code"];
    res.render("admin-form", { errors });
  }
}

async function deleteMessage(req, res, next) {
  try {
    const id = req.params.id;

    await pool.query("DELETE FROM messages WHERE id = $1", [id]);

    return res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  isAuthenticated,
  signUp,
  renderMembership,
  postMembership,
  renderAdmin,
  postAdmin,
  deleteMessage,
  isAdmin,
};
