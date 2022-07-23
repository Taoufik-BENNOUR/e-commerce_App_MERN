import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePassword } from '../../redux/actions/userActions'

const UpdatePassword = () => {
    const [oldPassword, setoldPassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
 
        const dispatch = useDispatch()
        useEffect(() => {
            console.log(newPassword)
       }, [oldPassword])
       
  const handleSubmit = (e) =>{
   if(oldPassword || newPassword === ""){
    e.target.setCustomValidity("Enter old password")
   }

    e.preventDefault()
    const formData = new FormData()
    formData.set("oldPassword",oldPassword)
    formData.set("newPassword",newPassword)
  
    dispatch(updatePassword(formData))

}
  return (
    <>
<div className="container-container-fluid">
		<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={(e)=>handleSubmit(e)}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e)=>setoldPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                ref={newPassword}
                                onChange={(e)=>setnewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
        
    </div>
    </>
  )
}

export default UpdatePassword