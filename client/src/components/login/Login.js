import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading'
import { login } from '../../redux/actions/authActions'
import "./login.css"
const Login = () => {
    
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth,loading} = useSelector(state=>state.authReducer)

    useEffect(() => {
    if(isAuth) {
        navigate("/")
    }
      
    },[isAuth,loading])
    
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login({email,password}))
    }
  return (
    <>
    {loading?<Loading/>:
    (<>
     <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={(e)=>submitHandler(e)}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}

              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
</div>
    </>)}
    </>
  )
}

export default Login