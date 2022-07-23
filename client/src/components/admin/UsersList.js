import { MDBDataTable } from 'mdbreact';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../../redux/actions/userActions';
import Loading from '../loading/Loading';
import Sidebar from './Sidebar';


const UsersList = () => {
    const dispatch = useDispatch()
    const {users,loading} = useSelector(state=>state.userReducer)
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        
        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                actions: <>
                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => dispatch(deleteUser(user._id))}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        })

        return data;
    }
 

  return (
    
    <>
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Users</h1>

                        {loading ? <Loading /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </>
                </div>
            </div>

        </>
    </>
  )
}

export default UsersList