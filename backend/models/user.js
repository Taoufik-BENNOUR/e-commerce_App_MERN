const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"Please enter yout name"]
},
email:{
    type:String,
    required:[true,"Please enter your email"],
    unique:true,
    validate:[validator.isEmail,"Please enter valid email address"]
},
password:{
    type:String,
    required:[true,"Please enter your password"],
    minlength:[6,"Your password must be more than 6 characters"]
},
avatar:{
    public_id:{
        type:String,
        // required:true
    },
    url:{
        type:String,
        // required:true
    }

},
role:{
    type:String,
    default:"user"
},
resetPasswordToken:String,
resetPasswordExpire:Date
},{timestamps:true})

userSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_TIME
    })
}
module.exports = mongoose.model("User",userSchema)