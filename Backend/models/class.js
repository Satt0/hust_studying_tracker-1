const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  semester: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  classCode: {
    type: String,
    required: false,
  },
  addtionalClassCode: {
    type: String,
    required: false,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  subjectInEng: {
    type: String,
    required: false,
  },
  amount: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  firstClass: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: false,
  },
  session: {
    type: String,
    required: false,
  },
  week: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  labRequired: {
    type: String,
    required: false,
  },
  registeredNo: {
    type: String,
    required: false,
  },
  maxRegistered: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  opened: {
    type: String,
    required: false,
  },
  irrelavent: {
    type: String,
    required: false,
  },
}, {collection: "Class"});

module.exports = mongoose.model("Class",classSchema);