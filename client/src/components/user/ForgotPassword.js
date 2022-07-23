import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../redux/actions/userActions'

const ForgotPassword = () => {

    const [email, setemail] = useState("")
    const dispatch = useDispatch()
    const handleSubmit = (e) =>{ 
         e.preventDefault()
         const formData = new FormData()
         formData.set("email",email)
       
         dispatch(forgotPassword(formData))
     
     }
  return (
    <>
<div class="container-container-fluid">
		<div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form class="shadow-lg" onSubmit={(e)=>handleSubmit(e)} >
                        <h1 class="mb-3">Forgot Password</h1>
                        <div class="form-group">
                            <label for="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                class="form-control"
                                value={email}
                                onChange={(e)=>setemail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            class="btn btn-block py-3">
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
        
    </div>
    </>
  )
}

export default ForgotPassword