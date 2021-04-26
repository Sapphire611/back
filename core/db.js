var mongoose = require('mongoose');
var testDB = 'mongodb://admin:Rabbit611.@101.133.175.192:27017/cms';
// var testDB = 'mongodb://localhost:27017/cms';
mongoose.connect(
    testDB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
      if (err) {
        console.log('MongoDB connect fail.');
      } else {
        // console.log('MongoDB connect success!!!!');
      }
    }
  );

module.exports = mongoose;