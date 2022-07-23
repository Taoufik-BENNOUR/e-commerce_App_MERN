import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductById, newReview } from '../../redux/actions/productActions'
import {Carousel} from "react-bootstrap"
import "./product.css"
import { addItemTocart } from '../../redux/actions/cartAction'
import Reviews from '../review/Reviews'
const ProductDetail = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state=>state.productReducer.product)
    const {user} = useSelector(state=>state.authReducer)

    const [Quantity, setQuantity] = useState(1)
    const [rating, setrating] = useState(0)
    const [comment, setcomment] = useState("")

    useEffect(() => {
     dispatch(getProductById(id))
    }, [dispatch,id,rating,comment])

    const increase = () =>{
        const count = document.querySelector(".count")
        if(count.valueAsNumber >= product.stock)return
        const quantity = count.valueAsNumber + 1
        setQuantity(quantity)
    }
    const decrease = () =>{
        const count = document.querySelector(".count")
        if(count.valueAsNumber <=1) return

        const quantity = count.valueAsNumber - 1
        setQuantity(quantity)
        
    }
    const addToCart = (e) =>{
        e.preventDefault()
        dispatch(addItemTocart(id,Quantity))
    }
    
    const setUserRatings = () => {
        const stars = document.querySelectorAll(".star")
        stars.forEach((star,i) =>{
            star.starValue = i + 1;
            ["click","mouseover","mouseout"].forEach((e)=>{star.addEventListener(e,showRatings)})    
        }); 
        function showRatings(e){
            stars.forEach((star,i)=>{
                if(e.type === "click"){
                    if(i < this.starValue){
                        star.classList.add("orange")
                        setrating(this.starValue)
                    }else{
                        star.classList.remove("orange")
                    }
                } if(e.type === "mouseover"){
                    if(i < this.starValue){
                        star.classList.add("yellow")
                    }else{
                        star.classList.remove("yellow")
                    }
                }
                if(e.type === "mouseout"){
                        star.classList.remove("yellow")
                    
                }
               
                
            })
        }
    }
    const reviewHandler = () =>{
        const formData = new FormData();
        formData.set("rating",rating)
        formData.set("comment",comment)
        formData.set("productId",id)
        dispatch(newReview(formData,id))
    }
  return (
    <>
     <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                               
                                    <Carousel.Item>
                                        <img className="d-block w-100" src="https://m.media-amazon.com/images/I/61s7sJEpsVL._SY450_.jpg"  />
                                    </Carousel.Item>
                                
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decrease} >-</span>

                                <input type="number" className="form-control count d-inline" value={Quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increase} >+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" 
                            disabled={product.stock <= 0} onClick={(e)=>addToCart(e)}>Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#ratingModal" 
                            onClick={setUserRatings}>
                                Submit Your Review
                            </button>
                                :
                                <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            } 
                

                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog"  aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e)=>setcomment(e.target.value)}
                                                       
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 "  data-bs-dismiss="modal" aria-label="Close" 
                                                    onClick={reviewHandler}>Submit</button>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                
                    </div>
                    {product.reviews && product.reviews.length > 0 && (product.reviews.map((review,i)=>     
                      <Reviews review={review} key={i} />
                    ))}
                    
              
    
    </>
  )
}

export default ProductDetail