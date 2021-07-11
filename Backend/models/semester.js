const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const semesterSchema = new Schema(
  {
    semester: {
      type: String,
      required: true,
    },
    subject: [
      {
        subjectId: {
          type: Schema.Types.ObjectId,
          ref: "Subject",
          required: false,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "Semester", timestamps: true }
);

module.exports = mongoose.model("Semester", semesterSchema);
