const router = require("express").Router();
let Room = require("../models/rooms.model");
let User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const { roomValidation } = require("../validation/validation");
const verify = require("./verify-token");

router.route("/").get((req, res) => {
  Room.find()
    .then((room) => res.json(room))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(verify, async (req, res) => {
  //VALIDATE THE REGISTERED INFO
  const { error } = roomValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check database for unique roomname
  const roomnameExist = await Room.findOne({
    roomname: req.body.roomname,
  });
  if (roomnameExist) return res.status(400).send("Roomname already exists");

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findOne({ _id: req.user });

  const roomname = req.body.roomname;
  const password = hashPassword;
  //const users = req.body.users;

  const newRoom = Room({
    roomname,
    password,
  });

  newRoom
    .save()
    .then(() => res.json({ user: user._id, roomname }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post(verify, async (req, res) => {
  //VALIDATE THE REGISTERED INFO
  console.log("req.body", req.body);
  const { error } = roomValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("req.body", req.body);
  //Check database for unique roomname
  const roomnameExist = await Room.findOne({
    roomname: req.body.roomname,
  });
  if (!roomnameExist) return res.status(400).send("Roomname does not exist");
  console.log("room", roomnameExist);
  //password is correct
  const validPass = await bcrypt.compare(
    req.body.password,
    roomnameExist.password
  );
  if (!validPass) return res.status(400).send("Invalid password");

  const user = await User.findOne({ _id: req.user });

  //res.send(`${user.username} logged in to room ${roomnameExist.roomname}`);
  res.json({ user: user._id, roomname: roomnameExist.roomname });
});

router.route("/:id").get((req, res) => {
  Room.findById(req.params.id)
    .then((room) => res.json(room))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Room.findByIdAndDelete(req.params.id)
    .then(() => res.json("Room deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Room.findById(req.params.id)
    .then((room) => {
      room.username = req.body.roomname;
      room.password = req.body.password;
      room.users = req.body.users;

      room
        .save()
        .then(() => res.json("Room updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
