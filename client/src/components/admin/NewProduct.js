import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProduct, updateProduct } from '../../redux/actions/productActions'

const NewProduct = ({update}) => {
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [description, setdescription] = useState("")
    const [category, setcategory] = useState("")
    const [stock, setstock] = useState("")
    const [seller, setseller] = useState("")
    const [images, setimages] = useState([])
    let categories = 
    ["Electronics","Laptop","Accessories","Headsets","Food","Clothes"]
const dispatch = useDispatch()
const navigate = useNavigate()

    
    const handleSubmit = (e) =>{
     
        e.preventDefault()
        const formData = new FormData()
        formData.set("name",name)
        formData.set("price",price)
        formData.set("description",description)
        formData.set("category",category)
        formData.set("stock",stock)
        formData.set("seller",seller)
        // images.forEach(image=>{
        //     formData.append("images",image)
        // })
       dispatch(createProduct(formData))
        // navigate("/admin/products")
    }
  return (
    <>
        <div className="container container-fluid">
        <div className="wrapper my-5"> 
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={handleSubmit}>
            <h1 className="mb-4">New Product</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e)=>setname(e.target.value)}
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                onChange={(e)=>setprice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea className="form-control" id="description_field" rows="8" value={description} 
                onChange={(e)=>setdescription(e.target.value)} ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select className="form-control" id="category_field" value={category} onChange={(e) => setcategory(e.target.value)}>
                        {categories.map(category => (
                    <option key={category} value={category} >{category}</option>
                  ))}
                    </select>
               
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                onChange={(e)=>setstock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                    onChange={(e)=>setseller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            multiple
                            accept='.png, .jpg, .jpeg'
                            onChange={(e)=>setimages(e.target.files[0])}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Images
                        </label>
                    </div>
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
           CREATE
            </button>

          </form>
    </div>
</div>
    </>
  )
}

export default NewProduct