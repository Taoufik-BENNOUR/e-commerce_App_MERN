import { GET_AUTH_USER, GET_AUTH_USER_FAILED, GET_AUTH_USER_SUCCESS, LOGIN, LOGIN_FAILED, LOGIN_SUCCESS,  LOGOUT_FAILED,  LOGOUT_SUCCESS, REGISTER, REGISTER_FAILED, REGISTER_SUCCESS } from "../actionTypes/authTypes";

const initialState = {
    loading:false,
    isAuth:false,
    user:{},
    error:[]
}

const authReducer = (state = initialState ,{type,payload}) =>{
    switch (type) {
        case LOGIN:
        case REGISTER:    
        case GET_AUTH_USER:
            return {...state,loading:true}
            
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {...state,loading:false,isAuth:true}
        case GET_AUTH_USER_SUCCESS:    
            return {...state,loading:false,isAuth:true,user:payload.user}

                 
       case LOGOUT_SUCCESS:
                return {...state,isAuth:false,loading:false,error:[],user:null}   
          
        case LOGIN_FAILED:
        case REGISTER_FAILED:
        case GET_AUTH_USER_FAILED:   
        case LOGOUT_FAILED: 
            return {...state,loading:false,isAuth:false,user:null,error:payload}  

            default: return state;
      
    }
}

export default authReducer