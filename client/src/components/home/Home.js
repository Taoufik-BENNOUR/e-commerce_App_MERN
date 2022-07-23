import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Loading from '../loading/Loading'
import Product from '../product/Product'
import { getProducts } from '../../redux/actions/productActions'
import "./home.css"
import  Pagination  from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);



const Home = ({col}) => {
  
  const dispatch = useDispatch()
const {products,productsCount,resultPerPage} = useSelector(state=>state.productReducer)
const [currentPage,setCurrentPage] = useState(1)
const [price, setprice] = useState([1,1000])
const [category, setcategory] = useState('')
const [rating, setrating] = useState(0)

const loading = useSelector(state=>state.productReducer.loading)
const {keyword} = useParams()

let categories = 
  ["Electronics","Laptop","Accessories","Headsets","Food","Clothes"]


  useEffect(() => {
    dispatch(getProducts(keyword,currentPage,price,category,rating))
  }, [dispatch,currentPage,keyword,price,category,rating])

  const setCurrentPageNumber = (n) =>{
    setCurrentPage(n)
  }
  return (
    <>
{loading?<Loading />:<div className='home'>
<h1 id="products_heading">Latest Products</h1>
<div id="products" className="container mt-5">
  <div className="row">
    {keyword? (<>
    <div className='col-6 col-md-3 mt-6 mb-6'>
      <div className='px-5'>
      <Range 
        marks={{1:`$1`,30:`$30`}}
        min={1} max={30}
        defaultValue={[1,30]}
        tipFormatter={value=>`$${value}`}
        topProps={{placement:"top",visible:true}}
        value={price} 
        onChange={price=>setprice(price) }/>
      </div>
      <hr className="my-5" />
  <div>
      <h4>categories</h4>
      <ul>
        {categories.map(category=><li style={{listStyle:"none",cursor:"pointer"}} key={category} onClick={()=>setcategory(category)}>
          {category}
        </li>)}
      </ul>
  </div>
  <hr className="my-5" />
  <div>
      <h4>Ratings</h4>
      <ul>
        {[5,4,3,2,1].map(star=><li style={{listStyle:"none",cursor:"pointer"}} key={star} onClick={()=>setrating(star)}>
          <div className='rating-outer'>
            <div className='rating-inner' style={{width:`${star * 20}%`}}>
            {star}
            </div>
          </div>
        </li>)}
      </ul>
  </div>
    </div>
    <div className='col-6 col-md-9'>
      <div className='row'>
      {products && products.map((product,i)=> <Product product={product} key={i}  col={4} />)}
      </div>

    </div>
    </>) :     (products && products.map((product,i)=> <Product product={product} key={i} col={3}/>))  
}
 </div>
</div>
<div className='pagination-container'>
  <Pagination 
  activePage={currentPage}
  itemsCountPerPage={resultPerPage}
  totalItemsCount = {productsCount} 
  onChange={setCurrentPageNumber}
  nextPageText={"Next"}
  prevPageText={"Prev"}
  firstPageText={"First"}
  lastPageText={"Last"}
  itemClass="page-item"
  linkClass="page-link"
  />

</div>
</div>}

    </>
  )
}

export default Home