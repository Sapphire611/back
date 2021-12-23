"use strict"

const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/Sirius_Delta?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
      if (err) {
        console.log('MongoDB connect fail.');
      } else {
        console.log('MongoDB connect success!!!!');
      }
    }
  );

module.exports = mongoose;