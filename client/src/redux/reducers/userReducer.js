import { DELETE_USER, DELETE_USER_FAILED, DELETE_USER_SUCCESS, FORGOT_PASSWORD, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, GET_ALL_USERS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESS, GET_USER_BY_ID, GET_USER_BY_ID_FAILED, GET_USER_BY_ID_SUCCESS, NEW_PASSWORD, NEW_PASSWORD_FAILED, NEW_PASSWORD_SUCCESS, UPDATE_PASSWORD, UPDATE_PASSWORD_FAILED, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS } from "../actionTypes/userTypes"

const initialState = {
    loading:false,
    updated:{},
    error:[],
    msg:"" ,
    users:[],
    user:{}
}


const userReducer = (state=initialState,{type,payload}) => {
    switch (type) {
        case UPDATE_PASSWORD:
        case UPDATE_PROFILE:    
        case FORGOT_PASSWORD:
        case NEW_PASSWORD:    
        case GET_ALL_USERS:
        case DELETE_USER:  
        case UPDATE_USER:  
        case GET_USER_BY_ID:
            return {...state,loading:true}

        case UPDATE_PASSWORD_SUCCESS:
        case DELETE_USER_SUCCESS:    
            return {...state,loading:false}

        case FORGOT_PASSWORD_SUCCESS:
        case NEW_PASSWORD_SUCCESS:    
            return {...state,loading:false,updated:payload.token}   ; 
        
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_USER_SUCCESS:   
            return {...state,loading:false,updated:payload}

        case GET_ALL_USERS_SUCCESS:
            return {...state,loading:false,users:payload.users}  
        
        case GET_USER_BY_ID_SUCCESS:
            return {...state,loading:false,user:payload.user}    

            
        case UPDATE_PROFILE_RESET:
            return {...state,updated:false}

        case UPDATE_PASSWORD_FAILED:
        case UPDATE_PROFILE_FAILED:    
        case FORGOT_PASSWORD_FAILED:
        case NEW_PASSWORD_FAILED:    
        case GET_ALL_USERS_FAILED:
        case DELETE_USER_FAILED:   
        case UPDATE_USER_FAILED:
        case GET_USER_BY_ID_FAILED:    
            return {...state,loading:false,error:payload}   ;     
    
        default:
            return state
    }

}


export default userReducer