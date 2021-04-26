const mongoose = require("mongoose"); 
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: String,
    nickname: String,
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    password: String,
    avatar: String,
  },
  { timestamps: true }
);

const ArticleSchema = new Schema(
  {
    userid: String,
    username: String,
    title: String,
    content: String,
    avatar:String
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
    avatar:String
  },
  { timestamps: true }
);

const Users = mongoose.model('User', UserSchema);
const Articles = mongoose.model('Article', ArticleSchema);
const Comments = mongoose.model('Comment', CommentSchema);

module.exports = { Users , Articles , Comments };