const { validationResult } = require("express-validator");
const pool = require("../db/pool");
const { ADD_MESSAGE } = require("../models/manageUsers");

async function renderMessageForm(req, res, next) {
  res.render("new-message");
}

async function postMessage(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("new-message", { errors: errors.array() });
  }
  try {
    console.log(req.body, res.locals.user);
    pool.query(ADD_MESSAGE, [
      req.body.title,
      req.body.message,
      new Date(),
      req.user.id,
    ]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

module.exports = { renderMessageForm, postMessage };
