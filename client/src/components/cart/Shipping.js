import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShipping } from '../../redux/actions/cartAction'
import {countries} from "countries-list"
import Checkout from './Checkout'
const Shipping = () => {
    const countriesList = Object.values(countries)

    const {shippingInfo} = useSelector(state=>state.cartReducer)
    const [address, setaddress] = useState(shippingInfo.address)
    const [city, setcity] = useState(shippingInfo.city)
    const [postalCode, setpostalCode] = useState(shippingInfo.postalCode)
    const [phoneNumber, setphoneNumber] = useState(shippingInfo.phoneNumber)
    const [country, setcountry] = useState(shippingInfo.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(saveShipping({address,city,postalCode,phoneNumber,country}))
        navigate("/order/confirm")
    }
  return (
    <>
    <Checkout shipping  />
         <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={(e)=>handleSubmit(e)}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label for="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e)=>setaddress(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label for="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e)=>setcity(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e)=>setphoneNumber(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label for="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e)=>setpostalCode(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label for="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e)=>setcountry(e.target.value)}
                                required 
                            >
                                {countriesList.map(country=>
                                 <option key={country.name} value={country.name}>
                                 {country.name}
                                </option>
                                    )}
                                   
                             

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
    </>
  )
}

export default Shipping