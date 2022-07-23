import React, { useEffect } from 'react'
import {MDBDataTable} from "mdbreact"
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, myOrders } from '../../redux/actions/orderActions'

const ListOrders = () => {

    const dispatch = useDispatch()
    const {orders} = useSelector(state=>state.orderReducer)
    useEffect(() => {
        dispatch(myOrders())

    }, [])
    const setOrders = () =>{
      const data = {
        columns:[{
            label:"Order ID",
            field:"id",
            sort:"asc"
        },{label:"Num of items",
        field:"numOfItems",
        sort:"asc"}
    
    ],
    rows:[]
      }
      {orders && orders.forEach(order=>
        {data.rows.push({id:order._id,
            numOfitems:order.orderItems.length})})}
    }
  return (


    <>
<h1 className='mt-5'>My Orders</h1>
    <MDBDataTable 
    data={setOrders()}
    className="px-3"
    bordered
    striped
    hover
    />
    </>
  )
}

export default ListOrders