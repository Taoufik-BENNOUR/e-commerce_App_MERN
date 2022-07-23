
const stripe = require("stripe")(process.env.STRIPE_SECRET_KET)


exports.processPayment = async(req,res) =>{

    try {
        const paymentIntent = await stripe.paymentIntent.create({
            amount:req.body.amount,
            currency:"usd",
            metadata:{integration_check:"accept_a_payment"}
        }) 
        res.status(200).json({client_Secret:paymentIntent.client_Secret})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.sendStripeApi = async(req,res) =>{

    res.status(200).json({ stripeApiKey:process.env.STRIPE_SECRET_KEY})

}