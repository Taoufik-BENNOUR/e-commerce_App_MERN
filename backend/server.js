
const express = require("express")
const connectDB = require("./config/connectDB")
const dotenv = require("dotenv").config({path:"./config/.env"})
const cookieParser = require("cookie-parser")
const productsRoute = require("./routes/product")
const authRoute = require("./routes/auth")
const orderRoute = require("./routes/order")
const paymentRoute = require("./routes/payment")

const bodyparser = require("body-parser")
const cloudinary = require("cloudinary")
const fileUpload = require("express-fileupload")

const app = express()
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload({useTempFiles: true}))

connectDB()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

app.use("/api",productsRoute)
app.use("/api",authRoute)
app.use("/api",orderRoute)
app.use("/api",paymentRoute)

app.listen(process.env.PORT,(error)=>{
    error?console.log(error):console.log("Server is running on",process.env.PORT)
})