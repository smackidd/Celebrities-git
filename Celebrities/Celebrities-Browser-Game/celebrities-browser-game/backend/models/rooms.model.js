const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomname: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minLength: 3,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minLength: 7,
    },
    //users: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
