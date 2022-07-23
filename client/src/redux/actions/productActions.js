import axios from "axios"
import { ADMIN_CREATE_PRODUCTS, ADMIN_CREATE_PRODUCTS_FAILED, ADMIN_CREATE_PRODUCTS_SUCCESS, ADMIN_DELETE_PRODUCTS, ADMIN_DELETE_PRODUCTS_FAILED, ADMIN_DELETE_PRODUCTS_SUCCESS, ADMIN_GET_ALL_PRODUCTS, ADMIN_GET_ALL_PRODUCTS_FAILED, ADMIN_GET_ALL_PRODUCTS_SUCCESS, ADMIN_UPDATE_PRODUCTS, ADMIN_UPDATE_PRODUCTS_FAILED, ADMIN_UPDATE_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_FAILED, GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_FAILED, GET_PRODUCT_BY_ID_SUCCESS, GET_REVIEWS, GET_REVIEWS_FAILED, GET_REVIEWS_SUCCESS, REVIEW, REVIEW_FAILED, REVIEW_SUCCESS } from "../actionTypes/productTypes"



export const getProducts = (keyword="",currentPage = 1,price,category,rating=0) => async(dispatch) =>{
    dispatch({type:GET_ALL_PRODUCTS})
    try {
        let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
        if(category){
        link=`/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }
        const response = await axios.get(link)

        dispatch({type:GET_ALL_PRODUCTS_SUCCESS,payload:response.data})
        
    } catch (error) {
        dispatch({type:GET_ALL_PRODUCTS_FAILED,payload:error.response.data})
    }
}

export const getProductById = (id) => async(dispatch) =>{
    dispatch({type:GET_PRODUCT_BY_ID})
    try {
        const response = await axios.get(`/api/product/${id}`)
    dispatch({type:GET_PRODUCT_BY_ID_SUCCESS,payload:response.data})
        
    } catch (error) {
        dispatch({type:GET_PRODUCT_BY_ID_FAILED,payload:error.response.data})
    }
}

export const newReview = (reviewData,id) => async(dispatch) =>{
    dispatch({type:REVIEW})
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    try {
        const response = await axios.put(`/api/review`,reviewData,config)
    dispatch({type:REVIEW_SUCCESS,payload:response.data})
    dispatch(getProductById(id))
        
    } catch (error) {
        dispatch({type:REVIEW_FAILED,payload:error.response.data})
    }
}

export const getReviews = (id) =>async(dispatch) => {
    dispatch({type:GET_REVIEWS})
    try {
        const response = await axios.get(`api/reviews?id=${id}`)
        dispatch({type:GET_REVIEWS_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:GET_REVIEWS_FAILED,payload:error.response.data})
    }
}

export const getAdminProducts = () =>async(dispatch) => {
    dispatch({type:ADMIN_GET_ALL_PRODUCTS})
    try {
        const response = await axios.get("/api/admin/products")
        dispatch({type:ADMIN_GET_ALL_PRODUCTS_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:ADMIN_GET_ALL_PRODUCTS_FAILED,payload:error.response.data})
    }
}

export const createProduct = (productData) => async (dispatch) => {
    dispatch({type:ADMIN_CREATE_PRODUCTS})
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
    const response = await axios.post("/api/admin/product/new",productData,config)
    
    dispatch({type:ADMIN_CREATE_PRODUCTS_SUCCESS,payload:response.data})
    } catch (error) {
    dispatch({type:ADMIN_CREATE_PRODUCTS_FAILED,payload:error.response.data})    
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    dispatch({type:ADMIN_DELETE_PRODUCTS})
    
    const response = await axios.delete(`/api/admin/product/${id}`)
    try {
    dispatch({type:ADMIN_DELETE_PRODUCTS_SUCCESS,payload:response.data}) 
    dispatch(getAdminProducts())
    } catch (error) {
    dispatch({type:ADMIN_DELETE_PRODUCTS_FAILED,payload:error.response.data})
    }
}

export const updateProduct = (productData,id) => async (dispatch) => {
    dispatch({type:ADMIN_UPDATE_PRODUCTS})
    
    try {
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const response = await axios.put(`/api/admin/product/${id}`,productData,config)

    dispatch({type:ADMIN_UPDATE_PRODUCTS_SUCCESS,payload:response.data}) 
    } catch (error) {
    dispatch({type:ADMIN_UPDATE_PRODUCTS_FAILED,payload:error.response.data})
    }
}