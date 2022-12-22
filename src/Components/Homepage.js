import React from 'react'
import Kids from "../img/kidsshoe.jpg"
import men from "../img/menshoes.jpg"
import women from "../img/womenshoe.png"
import shoe from "../img/shoe.jpg"
import { useContext, useEffect, useState } from "react"
import { CategoryContext } from "../App"
import { Link } from 'react-router-dom'
import axios from 'axios'


function Product({product}){
    return (
        <div className="featured">
            <img src={product.img.img1} alt="Shoe" />
            <Link to={"/product/"+product.name}>{product.name}</Link>
            <h4>${product.price}</h4>
        </div>
    )
}

function Homepage() {

    const { products, setProducts } = useContext(CategoryContext)

    function handleClick(){

    }

     const getHomePageData = async()=>{
        try{
            const response = await axios.get('http://localhost:8000/home');
            setProducts(response.data)
        } catch(e){
            console.log(e)
        }
     }

     useEffect(()=>{
        getHomePageData()
     })

  return (
    <>
    <div className='cover'>
        <div className="intext">
            <p className='header'>Discount <span>20%</span> For All Orders Over $12000</p>
            <p>Use coupon code <strong>DISCOUNT20</strong></p>
            <Link to="/category/men"><button onClick={handleClick}>Shop Now</button></Link>
        </div>
    </div>
    <div className="categories-container">
        <div className="category">
            <img src={men} alt="Men Category" />
            <h2>MEN SHOES COLLECTION</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio a qui aspernatur voluptas, nemo numquam.</p>
            <Link to="/category/men"><button onClick={handleClick}>Shop Men</button></Link>
        </div>
        <div className="category">
            <img src={women} alt="Women Category" />
            <h2>WOMEN SHOES COLLECTION</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio a qui aspernatur voluptas, nemo numquam.</p>
            <Link to="/category/women"><button onClick={handleClick}>Shop Women</button></Link>
        </div>
        <div className="category">
            <img src={Kids} alt="Kids Category" />
            <h2>Kids SHOES COLLECTION</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio a qui aspernatur voluptas, nemo numquam.</p>
            <Link to="/category/kids"><button onClick={handleClick}>Shop Kids</button></Link>
        </div>
    </div>
    <div className="featured-container">
        <h3>Featured Collection</h3>
        <div className="featured-card">

            {products && products.map((product) => <Product key={product._id} product={product} />)}
            
        </div>
    </div>
    </>
  )
}

export default Homepage