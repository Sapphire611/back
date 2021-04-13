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


const CommentSchema = new Schema(
  {
    userid: String,
    username: String,
    title: String,
    content: String,
    articleid: String,
  },
  { timestamps: true }
);

const Users = mongoose.model('User', UserSchema);
const Articles = mongoose.model('Article', ArticleSchema);
const Comments = mongoose.model('Comment', CommentSchema);

module.exports = { Users , Articles , Comments };