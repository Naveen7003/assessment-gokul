const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/gokul-task")

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,"Username is required"],
    maxLength:[30,"Username should not exceed more than 30 characters"],
    },
    
    email:{
      type:String,
      required:[true,"Email is required"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      unique:true
     },
     password: {
      type:String,
      maxLength:[15,"Password should not exceed more than 15 characters"],
      minLength:[3,"Password should have atleast 3 characters"],
      //match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
     },
     address:{
      type:String,
      maxLength:[100,"Password should not exceed more than 100 characters"],
      minLength:[10,"Password should have atleast 10 characters"],
     },
     contact:{
      type:String,
      maxLength:[10,"Contact should not exceed more than 10 characters"],
      minLength:[10,"Contact should be atleast more than 9 characters"],
      },
 
});
userSchema.plugin(plm)
module.exports = mongoose.model('User', userSchema);

