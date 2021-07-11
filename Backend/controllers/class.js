const Subject = require("../models/subject");
const User = require("../models/user");
const Class = require("../models/class");
const Semester = require("../models/semester");

const mongoose = require("mongoose");
const { ResultWithContext } = require("express-validator/src/chain");

exports.addSubject = (req, res, next) => {
  const { name, description, subjectCode } = req.body;
  const subject = new Subject({
    name: name,
    subjectCode: subjectCode,
    description: description,
  });
  subject
    .save()
    .then((result) => {
      res.status(201).json({
        message: "subject-created",
        subject: result,
      });
    })
    .catch((err) =>{
      if(!err.status)
      err.statusCode =500,
      next(err);
    });
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
      if(!err.statusCode)
      err.statusCode = 404;
      next(err);
    });
};

exports.saveClasses = (req, res, next) => {
  const { userId } = req;
  const { classList } = req.body;
  const classListId = classList.map((item) => mongoose.Types.ObjectId(item._id));
  const semester = new Semester({
    semester: "20201",
    subject: classListId,
    user: userId,
  });
  semester
    .save()
    .then((result) => {
      return User.findById(userId)
    })
    .then(user => {
      user.schedule.push(semester);
      user.save();
    })
    .then(result => {
      console.log(result);
    })
    .catch((err) => {
      if(!err.statusCode == 500)
      err.statusCode =500;
      next(err); 
    });
};

exports.updateClasses = (req, res, next) => {
  
}
