
const express = require("express")
const connectDB = require("./config/connectDB")
const dotenv = require("dotenv").config({path:"./config/.env"})

const productsRoute = require("./routes/product")

const app = express()
connectDB()
app.use(express.json())


app.use("/api",productsRoute)

app.listen(process.env.PORT,(error)=>{
    error?console.log(error):console.log("Server is running on",process.env.PORT)
})