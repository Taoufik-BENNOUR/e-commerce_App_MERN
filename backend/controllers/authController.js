const User = require("../models/user")
const bcrypt = require("bcrypt")
const sendToken = require("../utils/jwtToken")


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