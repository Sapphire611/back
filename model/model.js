const mongoose = require("mongoose"); 
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  info: {
    age: Number,
    height: Number,
  },
});

const ArticleSchema = new Schema(
  {
    userid: String,
    username: String,
    title: String,
    content: String,
  },
  { timestamps: true }
);


 CommentSchema = new Schema(
  {
    userid: String,
    username: String,
    title: String,
    content: String,
    articleid: String,
  },
  { timestamps: true }
);

let Users = mongoose.model('User', UserSchema);
let Articles = mongoose.model('Article', ArticleSchema);

module.exports = { Users , Articles };