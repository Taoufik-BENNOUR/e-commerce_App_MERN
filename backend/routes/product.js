const express = require("express")
const { getProducts, newProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productControllers")

const router = express.Router()

//http:localhost:8000/api/product/new

router.post("/admin/product/new",newProduct)

router.get("/products",getProducts)

router.get("/product/:id",getProductById)

router.put("/admin/product/:id",updateProduct)

router.delete("/admin/product/:id",deleteProduct)

module.exports = router