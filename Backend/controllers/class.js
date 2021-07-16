const User = require("../models/user");
const Class = require("../models/class");
const Semester = require("../models/semester");

const mongoose = require("mongoose");

exports.findClass = (req, res, next) => {
  const { subjectCode } = req.params;
  Class.find({ subjectCode: subjectCode })
    .lean()
    .then((classes) => {
      if (!classes) {
        const error = new Error("No class found");
        error.statusCode = 404;
        throw error;
      }
      const classList = {
        class: [],
        experiment: [],
      };
      // categorize class

      let i = 0;
      while (i < classes.length) {
        if (classes[i].type === "LT+BT") {
          let j = i;
          while (
            j < classes.length - 1 &&
            classes[j + 1].classCode === classes[j].classCode
          )
            j++;
          const deletedClasses = classes.slice(i, j + 1);
          classList.class.push(deletedClasses);
          i = j + 1;
        } else if (classes[i].type === "TN") {
          let j = i;
          while (
            j < classes.length - 1 &&
            classes[j + 1].classCode === classes[j].classCode
          )
            j++;
          const deletedClasses = classes.slice(i, j + 1);
          classList.experiment.push(deletedClasses);
          i = j + 1;
        } else if (classes[i].type === "BT") {
          const additionalClassNumber = classes.findIndex((item) => {
            return (
              item.classCode === classes[i].addtionalClassCode &&
              item.type === "LT"
            );
          });
          console.log(classes[i].additionalClassCode);
          let j = i;
          while (
            j < classes.length - 1 &&
            classes[j + 1].addtionalClassCode === classes[j].addtionalClassCode
          )
            j++;
          const deletedClasses = classes.slice(i, j + 1);
          deletedClasses.push(classes[additionalClassNumber]);
          classList.class.push(deletedClasses);
          i = j + 1;
        } else i++;
      }
      res.status(200).json({ data: classList });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.saveSchedule = (req, res, next) => {
  const { userId } = req;
  const { classList } = req.body;
  const classListId = classList.map((item) => {
    const convertedId = mongoose.Types.ObjectId(item._id);
    return convertedId;
  });
  const semester = new Semester({
    semester: "20201",
    subject: classListId,
    user: userId,
  });
  semester
    .save()
    .then((result) => {
      return User.findById(userId);
    })
    .then((user) => {
      user.schedule.push(semester);
      user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Schedule saved",
        data: semester,
        creator: userId,
      });
    })
    .catch((err) => {
      err.message = "Error saving schedule";
      if (!err.statusCode == 500) err.statusCode = 500;
      next(err);
    });
};

exports.getSchedule = (req, res, next) => {
  const { userId } = req;
  Semester.findOne({ user: userId })
    .then((result) => {
      if (!result) {
        const error = new Error("Schedule not found");
        err.statusCode = 404;
        throw error;
      }
      return Promise.all(
        result.subject.map(async (item) => {
          const subject = await Class.findById(item, function (err, doc) {
            return doc;
          });
          return subject;
        })
      );
    })
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.updateSchedule = (req, res, next) => {
  const { userId } = req;
  const { classList } = req.body;
  const classListId = classList.map((item) =>
    mongoose.Types.ObjectId(item._id)
  );
  Semester.findOneAndUpdate({ user: userId }, { classListId })
    .then((result) => {
      if (!result) {
        const error = new Error("Schedule not found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Schedule updated",
        data: result,
        user: userId,
      });
    })
    .catch((err) => {
      err.message = "Error updating schedule"
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
