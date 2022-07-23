import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserDetails, updateUser } from '../../redux/actions/userActions'
import Sidebar from './Sidebar'

const UpdateUser = () => {
    const dispatch = useDispatch()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [role, setrole] = useState("")
    const {user} = useSelector(state=>state.userReducer)
    const {id} = useParams()
    useEffect(() => {
      
    dispatch(getUserDetails(id))
    setname(user.name)
    setemail(user.email)
    }, [dispatch,id,user.name,user.email])
    
    const handleSubmit = (e) =>{
     
        e.preventDefault()
        const formData = new FormData()
        formData.set("name",name)
        formData.set("email",email)
        formData.set("role",role)
        dispatch(updateUser(formData))
    
    }
  return (
    <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={handleSubmit}>
                                <h1 className="mt-2 mb-5">Update User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
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
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setrole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

    </>
  )
}

export default UpdateUser