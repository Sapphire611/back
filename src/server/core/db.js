"use strict"

const config = require('config');
const mongoose = require('mongoose');

mongoose.connect(
    config.db,
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