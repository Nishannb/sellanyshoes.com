import React from 'react'
import { useContext, useEffect } from "react"
import { useParams, Link } from 'react-router-dom'
import { CategoryContext } from "../App"
import axios from 'axios'
 

function Product({product}){
    return (
       <div className="product">
        <img src={product.img.img1} alt="Shoe" />
        <Link to={"/product/"+product.name}>{product.name}</Link>
        <h4>${product.price}</h4>
    </div>
    )
}

function ProductPage() {

    const { products, setProducts } = useContext(CategoryContext)
    const { id } = useParams()

    function handleChange(e){
        console.log(e.target.value)
    }

   const getPageData = async()=>{
        try{
            const response = await axios.get(`http://localhost:8000/category/${id}`);
            setProducts(response.data)
        } catch(e){
            console.log(e)
        }
     }

     useEffect(()=>{
        getPageData()
     })

  return (
    <div className='productpage-container'>
        <div className="heading">
            <h1>{id}</h1>
        </div>
        <div className="product-display">
            <div className="shopby-form">
                <h3>SHOP BY</h3>
                <form action="" onChange={handleChange}>
                    <select name="size" id="size">
                        <option value="XL">XL</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="S">S</option>
                    </select>
                    <select name="color" id="color" value="">
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Brown">Brown</option>
                        <option value="Purple">Purple</option>
                    </select>
                    <select name="brand" id="brand">
                        <option value="Nike">Nike</option>
                        <option value="Addidas">Addidas</option>
                    </select>

                </form>
            </div>
            <div className="product-list">
                {products && products.map((product)=> <Product key={product._id} product={product} />)}
            </div>   
        </div>
    </div>
  )
}

export default ProductPage