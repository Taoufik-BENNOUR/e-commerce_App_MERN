const User = require("../models/user")
const bcrypt = require("bcrypt")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

exports.register = async (req,res)=>{

    try {
        const newUser = await new User({...req.body})
        const email = newUser.email
        const emailExist = await User.findOne({email})
        if(emailExist) return res.status(400).json("Email already Used")
        
        const salt = await bcrypt.genSalt(10)
        
        const hash = await bcrypt.hash(newUser.password,salt)

        newUser.password = hash
        // const token = newUser.getJwtToken()
        // res.status(200).json({msg:"user resgistred successfully",token})

        await newUser.save()
        sendToken(newUser,200,res)
    } catch (error) {
        res.status(400).json(error)
    }
}


exports.login = async (req,res) =>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})

        if(!user) return res.status(404).json({msg:"Email doesnt exist "})

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) return res.status(404).json({msg:"Bad credentials"})

        
        sendToken(user,200,res)
    } catch (error) {
        res.status(400).json({errors:[{msg:"Failed to login"}]})
    }

}

exports.logout = async (req,res)=>{
  try {
    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json("Logged out")
  } catch (error) {
      res.status(400).json(error)
  }

}

exports.getUserProfile = async (req,res) =>{
    try {
        const user = await User.findById(req.user.id)
    res.status(200).json({msg:"Found user",user})
    } catch (error) {
        res.status(400).json({errors:[{msg:"Failed to find user"}]})
    }
}
//Update User profile
exports.updateProfile = async (req,res) => {
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }
    try {
        const user = await User.findByIdAndUpdate(req.user.id,newUserData)
        res.status(200).json({msg:"updated",data: {...req.body}})
    } catch (error) {
        res.status(400).json({errors:[{msg:"error"}]})
    }
}
//Change password

exports.updatePassword = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id)
        const {oldPassword,newPassword} = req.body
        const isMatch = await bcrypt.compare(oldPassword,user.password)
        if(!isMatch) return res.status(400).json({errors:[{msg:"Old password is  incorrect"}]})

        const salt = await bcrypt.genSalt(10)
        
        const hash = await bcrypt.hash(newPassword,salt)

        user.password = hash
        await user.save()

        sendToken(user,200,res)
    } catch (error) {
        res.status(400).json(error)
    }
}
//Forgot password

exports.forgotPassword = async (req,res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json({msg:"Invalid email"})

    // get reset token
        const resetToken = user.getResetPasswordToken()

        await user.save()
        //create reset password url

        const resetUrl = `http://localhost:8000/api/password/reset/${resetToken}`
        const message = `Your password reset token ${resetUrl}`
        
        await sendEmail({
            email:user.email,
            subject : "Account Password reset",
            message : message
        })
        res.status(200).json({msg:`email sent to ${user.email}`})

    } catch (error) {
        res.status(400).json(error)
    }
}
exports.resetPassword = async (req,res)=>{
    
    try {
    const resetPasswordToken =  crypto.createHash("sha256").update(req.params.token).digest("hex")    
    const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}})
    if(!user) return res.status(400).json({msg:"Invalid token or expired"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    //new password
    user.password = hashedPassword
    await user.save()
    sendToken(user,200,res)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.getAllUsers = async (req,res) => {
    try {
        const users = await User.find()
        res.status(200).json({msg:"Found all users",users})
    
    } catch (error) {
    
        res.status(400).json(error)
    
    }
}

exports.getUserById = async (req,res) =>{
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(400).json({msg:"User doesnt exist"})

        res.status(200).json({msg:"Found User",user})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.updateUserProfile = async (req,res) => {
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{$set:newUserData})
        res.status(200).json({msg:"updated",data: {...req.body}})
    } catch (error) {
        res.status(400).json({errors:[{msg:"error"}]})
    }
}
exports.deleteUser = async (req,res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted successfully")
    } catch (error) {
        res.status(400).json({errors:[{msg:"Cant delete User"}]})
    }
}