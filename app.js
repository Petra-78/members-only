const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");
const flash = require("connect-flash");

const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash("error");
  res.locals.errors = [];
  next();
});

app.use("/", indexRouter);

app.use("/log-in", loginRouter);
app.use("/sign-up", signupRouter);
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use("/new", messageRouter);

app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`app listening on port ${process.env.PORT}!`);
});
