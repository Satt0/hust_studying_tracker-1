
const User = require("../models/user");
const Class = require("../models/class");
const Semester = require("../models/semester");

const mongoose = require("mongoose");

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
        item._id = item._id.toString();
        if (item.type === "LT+BT") classList.LT_BT.push(item);
        else classList[item.type].push(item);
      }
      res.status(200).json({ data: classList });
      return classList;
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
      console.log(result);
      return Promise.all(
        result.subject.map(async (item) => {
          const subject1 = await Class.findById(item, function (err, doc) {
            return doc;
          });
          console.log(subject1);
          return subject1;
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
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
