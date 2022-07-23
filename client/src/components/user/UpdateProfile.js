import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuthUser } from '../../redux/actions/authActions'
import { updateProfile } from '../../redux/actions/userActions'

const UpdateProfile = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [avatar, setavatar] = useState("")
    const [avatarPreview, setavatarPreview] = useState("/images/default_avatar.jpg")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {isAuth,user} = useSelector(state=>state.authReducer)

    const {loading,updated} = useSelector(state=>state.userReducer)

    useEffect(() => {
      if(user){
        setname(user.name)
        setemail(user.email)
      }
      // if(updated){
      //   // navigate("/profile")     
      // }
    }, [dispatch,user,isAuth,loading])
    
  const handleSubmit = (e) =>{
     
    e.preventDefault()
    const formData = new FormData()
    formData.set("name",name)
    formData.set("email",email)
    formData.set("avatar",avatar)
    dispatch(updateProfile(formData))
    dispatch(getAuthUser())

}
  return (
    <>
          <div className="container-container-fluid">
       <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data' onSubmit={(e)=>handleSubmit(e)}>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label for="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=>setname(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=>setemail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={user.avatar && user.avatar.url}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                            
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
                        <button type="submit" class="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
    </div>
    </>
  )
}

export default UpdateProfile