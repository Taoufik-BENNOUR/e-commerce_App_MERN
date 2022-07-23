import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderDetails } from '../../redux/actions/orderActions'

const OrderDetails = () => {

const dispatch = useDispatch()
const {orderDetails} = useSelector(state=>state.orderReducer)
const {id} = useParams()
useEffect(() => {
    dispatch(getOrderDetails(id))
console.log(orderDetails);
}, [])
  return (
    <>
    <div className="container container-fluid">
	
    <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-details">

                    <h1 className="my-5">Order # 4543f34f545</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p><b>Name:</b> John</p>
                    <p><b>Phone:</b> 111 111 1111</p>
                    <p className="mb-4"><b>Address:</b>Address of user</p>
                    <p><b>Amount:</b> $1111</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className="greenColor" ><b>PAID</b></p>


                    <h4 className="my-4">Order Status:</h4>
                    <p className={orderDetails.orderStatus && String(orderDetails.orderStatus).includes("Delivered")? 'greenColor':"redColor"} ><b>Delivered</b></p>


                    <h4 className="my-4">Order Items:</h4>

                    <hr />
                    <div className="cart-item my-1">
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img src='' alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <a href="#">Mic</a>
                                    </div>


                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>$33</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>2 Piece(s)</p>
                                    </div>
                                </div>
                    </div>
                    <hr />
                </div>
            </div>
    
</div>
    </>
  )
}

export default OrderDetails