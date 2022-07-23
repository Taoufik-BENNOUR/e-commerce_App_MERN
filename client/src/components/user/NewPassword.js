import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../redux/actions/userActions'

const NewPassword = () => {
    const [password, setpassword] = useState("")
    const [confirmedPassword, setconfirmedPassword] = useState("")
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {token} = useParams()
    const handleSubmit = (e) =>{ 
         e.preventDefault()
         const formData = new FormData()
         formData.set("password",password)
         formData.set("confirmedPassword",confirmedPassword)
       
         dispatch(resetPassword(token,formData))
         navigate("/login")
     }
  return (
    <>
 <div className="container-container-fluid">
		<div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={(e)=>handleSubmit(e)}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e)=>setpassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmedPassword}
                            onChange={(e)=>setconfirmedPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        
    </div>
    </>
  )
}

export default NewPassword