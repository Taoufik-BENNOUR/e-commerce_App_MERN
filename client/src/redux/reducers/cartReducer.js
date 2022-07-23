import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPNG } from "../actionTypes/cartTypes";

const initialState = {
    cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
    },
    shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{}

}

export const cartReducer = (state=initialState,{type,payload}) =>{
    switch (type) {
        case ADD_TO_CART :
            const item = payload

            const itemExist = state.cart.cartItems.find(i=>i.product === item.product)
            if(itemExist){
                return {...state,cart:{cartItems:state.cart.cartItems.map(i=>i.product === itemExist.product ?item:i )}}
            }else{
                return {...state,cart:{cartItems:[...item]}}
            }
            
        case REMOVE_CART_ITEM: 
        const items = payload

            return {...state,cart:{cartItems:[{...items}]}}

        case SAVE_SHIPPNG:
            return {...state,shippingInfo:payload}    
            
        default:
            return state;
    }
}

export default cartReducer