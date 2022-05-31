const express = require("express")
const { register, login, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserById, updateUserProfile, deleteUser } = require("../controllers/authController")
const { isAuth, authorizedRoles } = require("../middlewares/auth")

const Router = express.Router()


Router.post("/register",register)
Router.post("/login",login)
Router.get("/logout",logout)

Router.get("/currentUser",isAuth, getUserProfile)
Router.put("/currentUser/update",isAuth,updateProfile)
Router.put("/password/update",isAuth,updatePassword)

Router.post("/password/forgot",forgotPassword)
Router.put("/password/reset/:token",resetPassword)


Router.get("/admin/users",isAuth,authorizedRoles("admin"),getAllUsers)
Router.get("/admin/user/:id",isAuth,authorizedRoles("admin"),getUserById)
Router.put("/admin/user/:id",isAuth,authorizedRoles("admin"),updateUserProfile)
Router.delete("/admin/user/:id",isAuth,authorizedRoles("admin"),deleteUser)

module.exports = Router