import axios from "axios"
import { PAYMENT, PAYMENT_FAILED, PAYMENT_SUCCESS } from "../actionTypes/paymentTypes"


export const payment = (paymentData) =>async (dispatch) =>{
    dispatch({type:PAYMENT})
    const config = { 
        headers : {
          "Content-Type" : "application/json"
        }
      }
      try {

        const response = await axios.post("/api/payment/process",paymentData,config)
    dispatch({type:PAYMENT_SUCCESS,payload:response.data})  
    } catch (error) {
        dispatch({type:PAYMENT_FAILED,payload:error.response.data})
      }
}