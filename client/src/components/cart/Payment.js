import React, { useEffect } from 'react'
import {useStripe,useElements,CardNumberElement,CardExpiryElement,CardCvcElement} from "@stripe/react-stripe-js"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Checkout from './Checkout'
import axios from 'axios'
import { payment } from '../../redux/actions/paymentActions'

const Payment = () => {
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state=>state.cartReducer.cart)
    const {shippingInfo} = useSelector(state=>state.cartReducer)
    const {user} = useSelector(state=>state.authReducer)

        
    useEffect(() => {
    
   
    }, [])

    const order = {
      orderItems:cartItems,
      shippingInfo
    } 
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    // if(orderInfo) {
    //   order.itemsPrice = orderInfo.itemsPrice,
    //   order.shippingPrice = orderInfo.shippingPrice,
    //   order.taxPrice = orderInfo.taxPrice,
    //   order.totalPrice = orderInfo.totalPrice,
    //   order.paymentInfo = {
    //     id:result.paymentIntent.id,
    //     status:result.paymentIntent.status
    //   }
    // }
   
    const paymentData = {
      amount : Math.round(orderInfo.totalPrice*100)
    }
    const submitHandler = async (e) =>{
      e.preventDefault()
     dispatch(payment(paymentData))
const result = await stripe.confirmCardPayment("clientSecret",{
  payment_method:{
    card:elements.getElement(CardNumberElement),
    billing_details:{
      name:user.name,
      email:user.email
    }
  }

})
    }
  return (
    <>
        <Checkout shipping confirmOrder payment/>
         <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                  />
                </div>
				
				<div className="form-group">
                  <label for="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                  />
                </div>
				
				<div className="form-group">
                  <label for="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay
                </button>
    
              </form>
			  </div>
        </div>
    </>
  )
}

export default Payment