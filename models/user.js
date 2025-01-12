const { required } = require("joi");
const mongoose=require("mongoose");
const passport = require("passport");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose")
const userSchema=new Schema({
    email:{
        type:String,
        required:true
    }
})
//username and password will be defined automatically
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema)