import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviews } from '../../redux/actions/productActions'
import { MDBDataTable } from 'mdbreact';

const Reviews = () => {
    const [productId, setproductId] = useState("")
    const dispatch = useDispatch()
    const {review} = useSelector(state=>state.productReducer)

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        review.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" >
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getReviews(productId))
    }


  return (
    <>
    <div className="container container-fluid">
		<div className="row justify-content-center mt-5">
			<div className="col-5">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label for="productId_field">Enter Product ID</label>
                                    <input
                                        onChange={(e)=>setproductId(e.target.value)}
                                        type="text"
                                        id="email_field"
                                        className="form-control"
                                        value={productId}
                                    />
                                </div>

                                <button
                                    id="search_button"
                                    type="submit"
                                    className="btn btn-primary btn-block py-2"
                                >
                                    SEARCH
								</button>
                            </ form>
                        </div>
                        {review && review.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                                <p className="mt-5 text-center">No Reviews.</p>
                            )}
        </div>
    </div>
    </>
  )
}

export default Reviews