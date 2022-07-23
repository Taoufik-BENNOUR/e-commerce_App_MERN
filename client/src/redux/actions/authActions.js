import axios from "axios"
import { GET_AUTH_USER, GET_AUTH_USER_FAILED, GET_AUTH_USER_SUCCESS, LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_SUCCESS, REGISTER, REGISTER_FAILED, REGISTER_SUCCESS } from "../actionTypes/authTypes"





export const login = (userCred) => async (dispatch) =>{
    dispatch({type:LOGIN})
    try {
        const config ={
            headers : {
                "Content-Type":"application/json"
            }
        }
    const response = await axios.post("/api/login",userCred,config)    
    dispatch({type:LOGIN_SUCCESS,payload:response.data})    
    } catch (error) {
     
        dispatch({type:LOGIN_FAILED,payload:error.response.data})
    }

}

export const register = (userData) => async (dispatch) =>{
    dispatch({type:REGISTER})
    try {
        const config ={
            headers : {
                "Content-Type":"multipart/form-data"
            }
        }
    const response = await axios.post("/api/register",userData,config)    
    dispatch({type:REGISTER_SUCCESS,payload:response.data})    
    } catch (error) {
     
        dispatch({type:REGISTER_FAILED,payload:error.response.data})
    }

}


export const getAuthUser = () => async (dispatch) =>{
    dispatch({type:GET_AUTH_USER})
    try {
        const response = await axios.get("/api/currentUser")
        dispatch({type:GET_AUTH_USER_SUCCESS,payload:response.data})

    } catch (error) {
        dispatch({type:GET_AUTH_USER_FAILED,payload:error.response.data})
    }
}
 
export const logout = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/logout")
        dispatch({type:LOGOUT_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:LOGOUT_FAILED,payload:error.response.data})

    }
}