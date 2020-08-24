const router = require("express").Router();
let User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const { registerValidation, loginValidation } = require('../validation/validation');
const Joi = require("@hapi/joi");
////
//
// add Joi validation
// make usernames unique
// encrypt passwords (bcrypt.js)
// create JWT web token
//
////

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  //VALIDATE THE REGISTERED INFO
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(7).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check database for unique username
  const usernameExist = await User.findOne({
    username: req.body.username,
  });
  if (usernameExist) return res.status(400).send("Username already exists");

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const username = req.body.username;
  const password = hashPassword;

  const newUser = User({
    username,
    password,
  });

  newUser
    .save()
    .then(async () => {
      const userID = await User.findOne({ username });
      //create and assign a web token
      const token = jwt.sign({ _id: userID._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//login
router.route("/login").post(async (req, res) => {
  //VALIDATE THE REGISTERED INFO
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(7).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //Check database for login username
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) return res.status(400).send("Username does not exist");
  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //create and assign a web token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  //localStorage.setItem('token', token);
  res.header("auth-token", token).send(token);

  //res.send('Logged in');
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;
      user.password = req.body.password;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
