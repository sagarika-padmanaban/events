const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const BlogPost = new Schema({
  "title": {type:String,required:true,maxlength:25},
  "description":String,
  "location":String,
  "starttime":{type:Date, default:(new Date())},
   "endtime":{type:Date, default:(new Date())}
});
const event = mongoose.model('event',BlogPost);
module.exports= event