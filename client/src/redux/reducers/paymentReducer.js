import { PAYMENT, PAYMENT_FAILED, PAYMENT_SUCCESS } from "../actionTypes/paymentTypes";

const initialState = {
    loading:false,
    paymenData:{},
    error:[]
}

const paymenReducer = (state = initialState ,{type,payload}) =>{
    switch (type) {
        case PAYMENT:
            return {...state,loading:true}
            
        case PAYMENT_SUCCESS:
            return {...state,loading:false,paymenData:payload}

        case PAYMENT_FAILED: 
            return {...state,loading:false,error:payload}  

            default: return state;
      
    }
}

export default paymenReducer