var express = require("express");
var router = express.Router();
const User = require("../models/users");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// POST signup
router.post("/signup", function (req, res) {
  const { name, email, password } = req.body;

  if (!checkBody(name, email, password)) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  // console.log(email, "est ", isValidEmail);
  if (!isValidEmail) {
    res.json({ result: false, error: "email is not valid" });
    return;
  }

  const token = uid2(32);
  const hash = bcrypt.hashSync(password, 10);

  // Check if the user has not already been registered
  User.findOne({
    $or: [{ name: name.toLowerCase() }, { email: email.toLowerCase() }],
  }).then((data) => {
    if (data === null) {
      const newUser = new User({
        name: name.toLowerCase(),
        email: email,
        password: hash,
        token: uid2(32),
        favoriteRecipes: [],
        myRecipes: [],
        currentRecipes: [],
        historyRecipes: [],
      });

      newUser.save().then(() => {
        res.json({ result: true, newUser: newUser });
      });
    } else {
      // if data user exist => don't create new user
      res.json({ result: false, error: "User already exists" });
    }
  });
});

// POST signin
router.post("/signin", function (req, res) {
  const { name, password } = req.body;

  if (!checkBody(name, email, password)) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const hash = bcrypt.hashSync(req.body.password, 10);

  // Check if the user has already been registered
  User.findOne({ name: name.toLowerCase() }).then((data) => {
    if (data) {
      if (bcrypt.compareSync(password, data.password)) {
        res.json({ result: true });
      } else {
        res.json({ result: false, error: "wrong password" });
      }
    } else {
      res.json({ result: false, error: "User don't exists" });
    }
  });
});

module.exports = router;
