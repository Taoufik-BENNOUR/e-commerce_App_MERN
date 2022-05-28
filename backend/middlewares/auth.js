const jwt = require("jsonwebtoken")
const user = require("../models/user")
exports.isAuth = async (req,res,next)=>{

    const {token} = req.cookies
    try {
        if(!token) return res.status(400).json({msg:"You need to login"})
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await user.findById(decoded.id)
next()
    } catch (error) {
        res.status(400).json(error)
    }
 
}

exports.authorizedRoles =  (...roles) =>{
return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
            return res.status(404).json({msg:"Your are not allowed"})
    }
    next()
}
}