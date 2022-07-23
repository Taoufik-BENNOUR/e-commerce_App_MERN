import axios from "axios"
import { ADD_TO_CART, REMOVE_CART_ITEM } from "../actionTypes/cartTypes"



export const addItemTocart = (id,quantity) => async (dispatch) => {
    let cart = localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]

    let exist = cart.find(i=>i.product.toString() === id.toString())
    
    const {data} =await axios.get(`/api/product/${id}`)
    const productToAdd = {
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        // image:data.product.images[0].url,
        stock:data.product.stock,
        quantity
    }
        
        cart.push(productToAdd)
    
    dispatch({type:ADD_TO_CART,
        payload:cart})
    localStorage.setItem("cartItems",JSON.stringify(cart))
}

export const remoteCartItem = (id) => async (dispatch) => {
    const cart = localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
     
    const newCart = cart.filter(i=>i.product !== id)
    const {data} =await axios.get(`/api/product/${id}`)


    dispatch({type:REMOVE_CART_ITEM,
        payload:newCart})
    localStorage.setItem("cartItems",JSON.stringify(newCart))
}


export const saveShipping = (data) => async (dispatch) => {

        dispatch({type:REMOVE_CART_ITEM,payload:data})

    localStorage.setItem("shippingInfo",JSON.stringify(data))
}