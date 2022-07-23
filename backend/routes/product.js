const express = require("express")
const { getProducts, newProduct, getProductById, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteProductReview, getAdminProducts } = require("../controllers/productController")
const { isAuth, authorizedRoles } = require("../middlewares/auth")

const router = express.Router()

//http:localhost:8000/api/product/new

router.post("/admin/product/new",isAuth,newProduct)

router.get("/products",getProducts)

router.get("/product/:id",getProductById)

router.put("/admin/product/:id",isAuth,updateProduct)

router.delete("/admin/product/:id",isAuth,deleteProduct)

router.put("/review",isAuth,createProductReview)

router.get("/reviews",isAuth,getProductReviews)

router.delete("/reviews",isAuth,deleteProductReview)

router.get("/admin/products",isAuth,authorizedRoles("admin"), getAdminProducts)
module.exports = router