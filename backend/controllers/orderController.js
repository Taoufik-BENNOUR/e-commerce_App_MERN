const Order = require("../models/order")
const product = require("../models/product")
const Product = require("../models/product")


exports.newOrder = async (req,res) =>{
    try {
        
const newOrder =await new Order({userId:req.user._id,...req.body,paidAt:Date.now()})

await newOrder.save()
res.status(200).json({msg:"New order",newOrder})

} catch (error) {
        res.status(400).json({errors:[{msg:"Failed to make order",error}]})
    }
}
exports.getOrder = async (req,res) =>{
    try {
        const order = await Order.findById(req.params.id).populate("userId")
        res.status(200).json({msg:"Fetch order successfull",order})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.myOrders = async (req,res) =>{
    try {
        const order = await Order.find({userId:req.user._id})
        res.status(200).json({msg:"Fetch order successfull",order})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find()
        let totalAmount = 0
        orders.forEach(order=>totalAmount+=order.totalPrice)
        res.status(200).json({totalAmount,orders})

    } catch (error) {
        res.status(400).json({errors:[{msg:"cannot find orders"}]})
    }
}

exports.updateOrder = async (req,res) => {
    try {
        const order = await Order.findById(req.params.id)
        
        if(order.orderStatus === "Delivered") {return res.status(400).json({msg:"Order has been delivered"})}

        order.orderItems.forEach(async item => {
            await updateStock(item.product,item.quantity)
        })

        order.orderStatus = req.body.status
        order.deliveredAt = Date.now()

        await order.save()
        res.status(200).json({order})

    } catch (error) {
        res.status(400).json({errors:[{msg:"cannot find orders"}]})
    }
}
async function updateStock(id,quantity){
    const product = await Product.findById(id)
    product.stock = product.stock - quantity
    await product.save()
}

exports.deleteOrder = async (req,res) => {
    
    try {
    await Order.findByIdAndDelete(req.params.id)
    
    res.status(200).json({msg:"order deleted successfully"})    
    } catch (error) {
        res.status(400).json({msg:"Cant delete Order"})
    }
}