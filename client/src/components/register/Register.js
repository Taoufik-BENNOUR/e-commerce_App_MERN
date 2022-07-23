import React, { useEffect, useState } from 'react'
import { register } from '../../redux/actions/authActions'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [avatar, setavatar] = useState("")
    const [avatarPreview, setavatarPreview] = useState("/images/default_avatar.jpg")
    const {isAuth,loading} = useSelector(state=>state.authReducer)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      if(isAuth) {
          navigate("/")
      }
        
      })
      
      const handleSubmit = (e) =>{
     
          e.preventDefault()
          const formData = new FormData()
          formData.set("name",name)
          formData.set("email",email)
          formData.set("password",password)
          formData.set("avatar",avatar)
          dispatch(register(formData))
      }
  return (
    <>
           <div className="container container-fluid">
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={(e)=>handleSubmit(e)}>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" id="name_field" className="form-control" value={name} onChange={(e)=>setname(e.target.value)} />
          </div>

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
              <label for="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label for='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={avatarPreview}
                              className='rounded-circle'
                              alt='avatar'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          accept='.png, .jpg, .jpeg'
                          onChange={(e)=>setavatar(e.target.files[0])}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading?"loading"  :"REGISTER"}
            </button>
          </form>
		  </div>
    </div>
</div>
    </>
  )
}

export default Register