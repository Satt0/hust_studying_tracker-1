const Subject = require("../models/subject");
const User = require("../models/user");
const Class = require("../models/class");

const mongoose = require("mongoose");

exports.addSubject = (req, res, next) => {
  const { name, _id, description } = req.body;
  const subject = new Subject({
    name: name,
    _id: _id,
    description: description,
  });
  subject
    .save()
    .then((result) => {
      console.log("subject added");
      res.status(201).json({
        message: "subject-created",
        subject: result,
      });
    })
    .catch();
};


exports.findClass = (req, res, next) => {
  const { subjectCode } = req.params;
  Class.find({ subjectCode: subjectCode })
    .lean()
    .then((classes) => {
      const classList = {
        LT_BT: [],
        LT: [],
        BT: [],
        TN: [],
      };
      // categorize class type
      for (let item of classes) {
        if (item.type === "LT+BT") classList.LT_BT.push(item);
        else classList[item.type].push(item);
      }
      res.status(200).json({ data: classList });
      return classList;
    })
    .catch((err) => {
      const error = new Error(err);
      err.statusCode = 401;
      throw error;
    });
};

exports.saveClasses = ( req, res, next) => {
  const {userId} = req;
  const

}
