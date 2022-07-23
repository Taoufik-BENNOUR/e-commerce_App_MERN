import axios from "axios"
import { ALL_ORDERS, ALL_ORDERS_FAILED, ALL_ORDERS_SUCCESS, CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS, MY_ORDERS, MY_ORDERS_FAILED, MY_ORDERS_SUCCESS, ORDER_DETAILS, ORDER_DETAILS_FAILED, ORDER_DETAILS_SUCCESS } from "../actionTypes/orderTypes"



export const createOrder = (order) => async (dispatch) =>{
  
    dispatch({type:CREATE_ORDER})
    try {
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    const response = await axios.post("/api/order/new",order,config)
    dispatch({type:CREATE_ORDER_SUCCESS,payload:response.data})
    } catch (error) {
    
        dispatch({type:CREATE_ORDER_FAILED,payload:error.response.data})
        
    }
}


export const myOrders = () => async (dispatch) =>{
  
    dispatch({type:MY_ORDERS})
    try {
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    const response = await axios.get("/api/order/me",config)
    dispatch({type:MY_ORDERS_SUCCESS,payload:response.data})
    } catch (error) {
    
        dispatch({type:MY_ORDERS_FAILED,payload:error.response.data})
        
    }
}

export const getOrderDetails = (id) => async (dispatch) =>{
  
    dispatch({type:ORDER_DETAILS})
    try {
  
    const response = await axios.get(`/api/order/${id}`)
    dispatch({type:ORDER_DETAILS_SUCCESS,payload:response.data})
    } catch (error) {
    
        dispatch({type:ORDER_DETAILS_FAILED,payload:error.response.data})
        
    }
}

export const getAllOrders = () => async (dispatch) =>{
  
    dispatch({type:ALL_ORDERS})
    try {
  
    const response = await axios.get(`/api/admin/orders`)
    dispatch({type:ALL_ORDERS_SUCCESS,payload:response.data})
    } catch (error) {
    
        dispatch({type:ALL_ORDERS_FAILED,payload:error.response.data})
        
    }
}