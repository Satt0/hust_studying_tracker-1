const mongoose = require("mongoose");
const express = require("express");

const app = express();
const bodyParser = require('body-parser');

const scheduleRoutes = require('./routes/class');
const authRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/schedule',scheduleRoutes);
app.use('/auth',authRoutes);

app.use((error, req, res, next) => {
  // error handling
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data: data})
})
mongoose
  .connect("mongodb+srv://TranTuanDat:trantuandat26@cluster0.04jpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then( result => {
    app.listen(3000);
    console.log('Database connected')
  })
  .catch( err => console.log(err));
