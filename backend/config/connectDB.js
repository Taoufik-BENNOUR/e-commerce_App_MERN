const mongoose = require("mongoose")


const connectDB = async () =>{
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected")
} catch (error) {
    console.log("Failed to connect to DB")
    console.log(error)
}
} 



module.exports = connectDB