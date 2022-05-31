
const sendToken = (user,statusCode,res) => {
    
    const {password,...others} = user._doc
    const token = user.getJwtToken();

    const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 3600),
        httpOnly: true

    }
    res.status(statusCode).cookie("token",token,options).json({others,token})
}

module.exports = sendToken