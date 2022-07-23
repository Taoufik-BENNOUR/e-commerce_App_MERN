const express = require('express')
const { processPayment, sendStripeApi } = require('../controllers/paymentController')
const { isAuth, authorizedRoles } = require('../middlewares/auth')


const router = express.Router()

router.post("/payment/process",isAuth, processPayment)

router.get("/stripeapi",isAuth, sendStripeApi)



module.exports = router