const express = require('express')
const { newOrder, getOrder, myOrders, getAllOrders, updateOrder, deleteOrder, } = require("../controllers/orderController")
const { isAuth, authorizedRoles } = require('../middlewares/auth')


const router = express.Router()

router.post("/order/new",isAuth, newOrder)

router.get("/order/:id",isAuth, getOrder)

router.get("/order/me",isAuth, myOrders)

router.get("/admin/orders",isAuth,authorizedRoles("admin"),getAllOrders)

router.put("/admin/order/:id",isAuth,authorizedRoles("admin"),updateOrder)

router.delete("/admin/order/:id",isAuth,authorizedRoles("admin"),deleteOrder)

module.exports = router