const mogoose=require ("mongoose");
const userSchema=mogoose.Schema({

name:{
    type:String,
    required:[true,"Please add a name"],
    unique:true
},
email:{
    type:String,
    required:[true,"Please add email"],
    unique:true
},
password:{
    type:String,
    required:[true,"Please enter password"]
},
role:{
    type:String,
    enum:['user','admin'],
    default:'user'

},
otp: {
    type: String
},
otpExpires: {
    type: Date
},
verified:{
    type:Boolean,
    default:false,
  
},

})
module.exports=mogoose.model("User",userSchema);