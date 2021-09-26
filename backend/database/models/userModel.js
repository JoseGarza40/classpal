const {Schema, model}= require('mongoose');
const User=new Schema(
    {
        _id:{type:String, required:false},
        name:{type:String, required:true},
        lastname:{type:String, required:true},
        email:{type:String, required:true},
        password:{type:String, required:true},
    }
)

module.exports=model("user", User)