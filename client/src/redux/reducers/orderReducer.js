import { ALL_ORDERS, ALL_ORDERS_FAILED, ALL_ORDERS_SUCCESS, CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS, MY_ORDERS, MY_ORDERS_FAILED, MY_ORDERS_SUCCESS, ORDER_DETAILS, ORDER_DETAILS_FAILED, ORDER_DETAILS_SUCCESS } from "../actionTypes/orderTypes";

const initialState={
    order:{},
    myOrder:[],
    orderDetails:{},
    Orders:[]
}


const orderReducer = (state=initialState,{type,payload}) =>{
    switch (type) {
        case CREATE_ORDER:
        case MY_ORDERS:
        case ORDER_DETAILS: 
        case ALL_ORDERS:       
            return {...state,loading:true}

        case CREATE_ORDER_SUCCESS:
            return {...state,loading:false,order:payload} 

        case MY_ORDERS_SUCCESS:
                return {...state,loading:false,myOrder:payload,order:{}}  
        case ALL_ORDERS_SUCCESS:
                return {...state,loading:false,Orders:payload}        

        case ORDER_DETAILS_SUCCESS:
            return {...state,loading:false,orderDetails:payload} 

        case CREATE_ORDER_FAILED:
        case MY_ORDERS_FAILED:   
        case ORDER_DETAILS_FAILED: 
        case ALL_ORDERS_FAILED:
            return {...state,loading:false,error:payload}
       
            default: return state;
    }
}

export default orderReducer