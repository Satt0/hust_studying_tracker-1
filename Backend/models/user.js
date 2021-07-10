const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: false,
    },
    schedule: [
      {
        semesterId: {
          type: Schema.Types.ObjectId,
          ref: "Semester",
          required: false,
        },
      },
    ],
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", userSchema);
