const express = require("express")
const { getProducts, newProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productController")
const { isAuth, authorizedRoles } = require("../middlewares/auth")

const router = express.Router()

//http:localhost:8000/api/product/new

router.post("/admin/product/new",isAuth,newProduct)

router.get("/products",isAuth,authorizedRoles("admin"), getProducts)

router.get("/product/:id",getProductById)

router.put("/admin/product/:id",isAuth,updateProduct)

router.delete("/admin/product/:id",isAuth,deleteProduct)

module.exports = router