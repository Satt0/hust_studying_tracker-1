const User = require("../models/user");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { email, name, password } = req.body;
  // hashed password for security
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });
      user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      // Cant find the user
      if (!user) {
        const error = new Error('No user found!');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      // Password is not correct
      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }
      // Validated and create a jwt
      const token = jwt.sign({
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      }, "secretkey",
        {
          expiresIn: '1h'
        });
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString()
      })

    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })


}