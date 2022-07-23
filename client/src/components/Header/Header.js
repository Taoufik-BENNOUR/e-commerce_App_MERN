import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import {useSelector,useDispatch} from "react-redux"

import "./header.css"
import { getAuthUser, logout } from '../../redux/actions/authActions'
import { useEffect } from 'react'

const Header = () => {

  const {user,loading,isAuth} = useSelector(state=>state.authReducer)
  const {cartItems} = useSelector(state=>state.cartReducer.cart)

  const dispatch = useDispatch()

 
  

  return (
    <>
         <nav className="header">
      <div className="col-12 col-md-3">
        <div className="logo">
           <Link to="/">
             <img  className="logo" src="/images/keyit-logo.png" alt='logo'/>  
           </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart">
        <span id="cart" className="mr-4">Cart</span>
        <span className="mr-3" id="cart_count">{cartItems.length}</span>
        </Link>
    
        {!user?<Link to={"/login"}>
                <button className="btn" id="login_btn">Login</button>
        </Link>:!loading  && (
        
        <div className='ml-4 dropdown d-inline '>
        <Link to="#" 
        class="btn dropdown-toggle text-white"  type="button" id="dropDownMenuButton" data-bs-toggle="dropdown"
       aria-expanded="false">
          <figure className='avatar avatar-nav'>
            <img src={user.avatar && user.avatar.url}
            alt={user && user.name}
            className="rounded-circle" />
          </figure>
          <span>{user&&user.name}</span>
        </Link>

        <div class='dropdown-menu' aria-labelledby='dropDownMenuButton'>
          {user && user.role==="admin"&&
                  <Link class='dropdown-item ' to="/dashboard">
                  Dashboard
                </Link>
                }
               <>
               <Link class='dropdown-item' to="/orders/me">
               Orders
             </Link>
                <Link class='dropdown-item' to="/profile">
                Profile
              </Link>
              <Link class='dropdown-item text-danger' to="/" onClick={()=>dispatch(logout())}>
                Logout
              </Link>
               </>
       
       


        </div>
        </div> )}
   

      </div>
    </nav>
    </>
  )
}

export default Header