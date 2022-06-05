
const express = require("express")
const connectDB = require("./config/connectDB")
const dotenv = require("dotenv").config({path:"./config/.env"})
const cookieParser = require("cookie-parser")
const productsRoute = require("./routes/product")
const authRoute = require("./routes/auth")
const orderRoute = require("./routes/order")


const app = express()
connectDB()
app.use(express.json())
app.use(cookieParser())


app.use("/api",productsRoute)
app.use("/api",authRoute)
app.use("/api",orderRoute)

app.listen(process.env.PORT,(error)=>{
    error?console.log(error):console.log("Server is running on",process.env.PORT)
})