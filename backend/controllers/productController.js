const Product = require("../models/product")
const APIFeatures = require("../utils/apiFeatures")

//Add new product
exports.newProduct = async (req,res,next)=>{
try {
    req.body.userId = req.user.id
    const newProduct = await new Product(req.body)

    await newProduct.save()
    res.status(200).json({success:true,newProduct})

} catch (error) {
    res.status(400).json({errorMsg:[{msg:"Failed to add product",error}]})
}
} 
//Fetch all products
exports.getProducts = async (req,res,next)=>{

    const resultPerPage = 6 ;
    try {
        const productsCount = await Product.countDocuments()
        const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)

        const products = await apiFeatures.query
        res.status(200).json({message:"Fetch all products",count:products.length,productsCount,products,resultPerPage})

    } catch (error) {
        res.status(400).json(error)

    }
}

//Fetch one product by ID
exports.getProductById = async (req,res)=>{

    try {
        const product = await Product.findById(req.params.id)

    res.status(200).json({message:"Found product",product})

} catch (error) {
    res.status(400).json({errors:[{errorMsg:"Failed to get product"}] })
}}

//updateProduct
exports.updateProduct = async (req,res)=>{
    try {
        await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })

        res.status(200).json()
    } catch (error) {
        res.status(400).json({errors:[{errorMsg:"Failed to update product"}]})
    }
}
//Delete Product
exports.deleteProduct = async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        
        res.status(400).json({errors:[{errorMsg:error}]})
    }
}

exports.createProductReview = async (req,res) => {
    try {
        const {rating,comment,productId} = req.body
        const review = {
            userId:req.user._id,
            name:req.user.name,
            rating:Number(rating),
            comment:comment
        }
        const product = await Product.findById(productId)
        
        const isReviewed = product.reviews.find(rev=>rev.userId.toString() === req.user._id.toString())
        if(isReviewed){
            product.reviews.forEach(rev => {
                if(rev.userId.toString()===req.user._id.toString()){
                    rev.rating = rating
                    rev.comment = comment
                }
            })
        }else{
            product.reviews.push(review)
            // product.reviews = [...product.reviews,review]
            product.numOfreviews = product.reviews.length
        }

        product.ratings = product.reviews.reduce((a,b)=>a+b.rating ,0) / product.reviews.length

        await product.save()

        res.status(200).json({msg:"Review Added"})
    } catch (error) {
        res.status(400).json({error})
    }
}

exports.getProductReviews = async (req,res) =>{
    try {
        const productReviews = await Product.findById(req.query.id)

        res.status(200).json({msg:"Fetch all reviews",reviews:productReviews.reviews})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteProductReview = async (req,res) =>{
    try {
        const product =  await Product.findById(req.query.productId)
       const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

       const numOfreviews = reviews.length
       const ratings = product.reviews.reduce((a,b)=>a+ b.rating ,0) / reviews.length
       
       await Product.findByIdAndUpdate(req.query.productId,{reviews,ratings,numOfreviews})
       res.status(200).json({msg:"Review deleted"})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getAdminProducts = async(req,res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json(error)
    }
}

