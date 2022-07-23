import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addItemTocart, remoteCartItem } from '../../redux/actions/cartAction'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {cartItems} = useSelector(state=>state.cartReducer.cart)

    const increase = (id,quantity,stock) =>{
        const newQty = quantity + 1
        if(newQty >= stock) return
        
        dispatch(addItemTocart(id,newQty))
    }
    const decrease = (id,quantity) =>{
        const newQty = quantity - 1
        if(newQty <= 0) return
        
        dispatch(addItemTocart(id,newQty))
    
    }

    const removeCart = (id) => {
        dispatch(remoteCartItem(id))
    }
    const checkOutHandler = () =>{
    navigate("/shipping") 
    }

  return (
    <>
        <div className="container container-fluid">
            {cartItems.length === 0?
            <h2 className="mt-5">Your Cart is Empty </h2>
            :<>
            <h2 className="mt-5">Your Cart: <b>{cartItems.length} item(s)</b></h2>
                   
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                {cartItems.map(item=><>
                    <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt={item.name} height="90" width="115"/>
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/product/${item.product}`} >{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus"
                                  onClick={()=>decrease(item.product,item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus"
                                  onClick={()=>increase(item.product,item.quantity)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" 
                            onClick={()=>removeCart(item.product)}></i>
                        </div>

                    </div>
                </div>
                <hr /></>)}
 
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((a,item)=>a+ Number(item.quantity),0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${cartItems.reduce((a,item)=>a+  item.quantity * item.price ,0)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkOutHandler}>Check out</button>
                </div>
            </div>
        </div>
            </>}
 
    </div>
    </>
  )
}

export default Cart
