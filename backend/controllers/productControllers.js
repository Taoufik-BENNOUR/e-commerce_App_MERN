const Product = require("../models/product")


//Add new product
exports.newProduct = async (req,res,next)=>{
try {
    const newProduct = await new Product(req.body)

    await newProduct.save()
    res.status(200).json({success:true,newProduct})

} catch (error) {
    res.status(400).json({errorMsg:[{msg:"Failed to add product"}]})
}
} 
//Fetch all products
exports.getProducts = async (req,res,next)=>{

    try {
        const products = await Product.find()
        res.status(200).json({success:true,count:products.length,products})

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
        res.status(200).json("Product deleted successfully")
    } catch (error) {
        
        res.status(400).json({errors:[{errorMsg:error}]})
    }
}


