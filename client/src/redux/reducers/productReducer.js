import { ADMIN_CREATE_PRODUCTS, ADMIN_CREATE_PRODUCTS_FAILED, ADMIN_CREATE_PRODUCTS_SUCCESS, ADMIN_DELETE_PRODUCTS, ADMIN_DELETE_PRODUCTS_FAILED, ADMIN_DELETE_PRODUCTS_SUCCESS, ADMIN_GET_ALL_PRODUCTS, ADMIN_GET_ALL_PRODUCTS_FAILED, ADMIN_GET_ALL_PRODUCTS_SUCCESS, ADMIN_UPDATE_PRODUCTS, ADMIN_UPDATE_PRODUCTS_FAILED, ADMIN_UPDATE_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_FAILED, GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_FAILED, GET_PRODUCT_BY_ID_SUCCESS, GET_REVIEWS, GET_REVIEWS_FAILED, GET_REVIEWS_SUCCESS, REVIEW, REVIEW_FAILED, REVIEW_SUCCESS } from "../actionTypes/productTypes";

const initialState ={
    loading:false,
    products:[],
    product:"",
    newproduct:"",
    productsCount:"",
    message:"",
    error:[],
    review:""
}

const productReducer = (state=initialState,{type,payload}) => {
    switch (type) {
        case GET_ALL_PRODUCTS:
        case GET_PRODUCT_BY_ID:
        case ADMIN_GET_ALL_PRODUCTS:  
        case ADMIN_CREATE_PRODUCTS:  
        case ADMIN_DELETE_PRODUCTS:
        case ADMIN_UPDATE_PRODUCTS:    
        case REVIEW:    
        case GET_REVIEWS:
            return {...state,loading:true}

        case GET_ALL_PRODUCTS_SUCCESS:
            return {...state,loading:false,products:payload.products,productsCount:payload.productsCount,
                resultPerPage:payload.resultPerPage}

        case ADMIN_GET_ALL_PRODUCTS_SUCCESS:
            return {...state,loading:false,products:payload}
        
        case ADMIN_CREATE_PRODUCTS_SUCCESS:
            return {...state,loading:false,newproduct:payload}

        case ADMIN_UPDATE_PRODUCTS_SUCCESS:    
            return {...state,loading:false,product:payload}
        
        case ADMIN_DELETE_PRODUCTS_SUCCESS:
            return {...state,loading:false,message:payload}    
            
        case GET_PRODUCT_BY_ID_SUCCESS:
            return {...state,loading:false,product:payload.product,message:payload.message}   

        case REVIEW_SUCCESS:
        case GET_REVIEWS_SUCCESS:    
            return {...state,loading:false,review:payload}
            
        case GET_ALL_PRODUCTS_FAILED:
        case GET_PRODUCT_BY_ID_FAILED: 
        case ADMIN_GET_ALL_PRODUCTS_FAILED:
        case ADMIN_CREATE_PRODUCTS_FAILED:  
        case ADMIN_DELETE_PRODUCTS_FAILED:
        case ADMIN_UPDATE_PRODUCTS_FAILED:   
        case GET_REVIEWS_FAILED:   
        case REVIEW_FAILED:   
            return {...state,loading:false,error:payload}

         
    
        default:
            return state;
    }
}

export default productReducer;