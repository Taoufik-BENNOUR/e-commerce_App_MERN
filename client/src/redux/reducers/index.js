import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import paymentReducer from "./paymentReducer";
import orderReducer from "./orderReducer";



 const rootReducer = {
    productReducer:productReducer,
    authReducer : authReducer,
    userReducer : userReducer,
    cartReducer : cartReducer,
    paymentReducer:paymentReducer,
    orderReducer:orderReducer
}

 export default rootReducer