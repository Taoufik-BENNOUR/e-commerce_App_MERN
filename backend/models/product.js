const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
name: {
    type:String,
    required:[true,"Please enter product name"],
    trim:true,
    maxlength:[100,"Please name cannot exceed 100 characters "]
},
price: {
    type:Number,
    required:[true,"Please enter product price"],
    trim:true,
    maxlength:[5,"Please price cannot exceed 5 characters "],
    default:0.0

},
description: {
    type:String,
    required:[true,"Please enter product description"]
},
ratings: {
    type:Number,
    default:0
},
images:[
    {
        public_id:{
            type:String,
            // required:true
        },
        url:{
            type:String,
            // required:true
        }
    },
],
category:{
    type:String,
    required:[true,"Please select category for this product"],
    enum:{
        values:["Electronics","Laptop","Accessories","Headsets","Food","Clothes"],
        message:"Please select correct category for product"
    }
},
seller:{
    type:String,
    required:[true,"Please enter product seller"]
},stock:{
    type:Number,
    required:[true,"Please enter product stock"],
    maxlength:[5,"Product cannot exceed 5 numbers"]
},
numOfreviews:{
    type:Number,
    default:0
},
reviews:[
    {   
        userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
],userId:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
}
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)