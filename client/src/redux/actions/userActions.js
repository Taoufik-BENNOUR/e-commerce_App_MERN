import axios from "axios"
import { DELETE_USER, DELETE_USER_FAILED, DELETE_USER_SUCCESS, FORGOT_PASSWORD, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, GET_ALL_USERS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESS, GET_USER_BY_ID, GET_USER_BY_ID_FAILED, GET_USER_BY_ID_SUCCESS, NEW_PASSWORD, NEW_PASSWORD_FAILED, NEW_PASSWORD_SUCCESS, UPDATE_PASSWORD, UPDATE_PASSWORD_FAILED, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS, UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS } from "../actionTypes/userTypes"

//Update profile
export const updateProfile = (userData) => async (dispatch) =>{
    dispatch({type:UPDATE_PROFILE})
    try {
        const config ={
            headers : {
                "Content-Type":"multipart/form-data"
            }
        }
        const response = await axios.put("/api/currentUser/update",userData,config)
        
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:response.data})

    } catch (error) {

        dispatch({type:UPDATE_PROFILE_FAILED,payload:error.response.data})
    }
}

export const getAllUsers = () =>async(dispatch) => {
    
    dispatch({type:GET_ALL_USERS})
    try {
        const response = await axios.get("/api/admin/users")
        dispatch({type:GET_ALL_USERS_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:GET_ALL_USERS_FAILED,payload:error.response.data})
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_USER_BY_ID })


        const response = await axios.get(`/api/admin/user/${id}`)

        dispatch({
            type: GET_USER_BY_ID_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type:GET_USER_BY_ID_FAILED ,
            payload: error.response.data.message
        })
    }
}
export const updateUser = (id,userData) =>async(dispatch) => {
    
    dispatch({type:UPDATE_USER})
    const config ={
        headers : {
            "Content-Type":"application/json"
        }
    }
    try {
        const response = await axios.put(`/api/admin/user/${id}`,userData,config)
        dispatch({type:UPDATE_USER_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:UPDATE_USER_FAILED,payload:error.response.data})
    }
}
export const deleteUser = (id) =>async(dispatch) => {
    
    dispatch({type:DELETE_USER})
    try {
        const response = await axios.delete(`/api/admin/user/${id}`)
        dispatch({type:DELETE_USER_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:DELETE_USER_FAILED,payload:error.response.data})
    }
}
export const updatePassword = (passwords) => async (dispatch) =>{
    dispatch({type:UPDATE_PASSWORD})
    try {
        const config ={
            headers : {
                "Content-Type":"application/json"
            }
        }
        const response = await axios.put("/api/password/update",passwords,config)
        
        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:response.data})

    } catch (error) {

        dispatch({type:UPDATE_PASSWORD_FAILED,payload:error.response.data})
    }
}


export const forgotPassword = (email) => async (dispatch) =>{
    dispatch({type:FORGOT_PASSWORD})
    try {
        const config ={
            headers : {
                "Content-Type":"application/json"
            }
        }
        const response = await axios.post("/api/password/forgot",email,config)
        
        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:response.data})

    } catch (error) {

        dispatch({type:FORGOT_PASSWORD_FAILED,payload:error.response.data})
    }
}

export const resetPassword = (token,password) => async (dispatch) =>{
    dispatch({type:NEW_PASSWORD})
    try {
        const config ={
            headers : {
                "Content-Type":"application/json"
            }
        }
        const response = await axios.put(`/api/password/reset/${token}`,password,config)
        
        dispatch({type:NEW_PASSWORD_SUCCESS,payload:response.data})

    } catch (error) {

        dispatch({type:NEW_PASSWORD_FAILED,payload:error.response.data})
    }
}