import React from 'react'
import Cart from "../img/cart.png"
import Profile from "../img/profile.png"
import { useContext } from "react"
import { CartContext } from "../App"
import { Link } from 'react-router-dom'

function NavBar() {

    const { cartItems, setCartItems } = useContext(CartContext)
    const cart = JSON.parse(localStorage.getItem('cart'))
  return (
    <div className='main-navbar'>
        <div className="navbar">
            <div className="brand-name">
                <Link to="/"><h1><span>S</span>ell<span>A</span>ny<span>S</span>hoe <br />.com</h1></Link>
            </div>
            <div className="sections-container">
                <div className="sections">
                    <Link to="/category/Men">Men</Link>
                    <Link to="/category/Kids">Kids</Link>
                    <Link to="/category/Women">Women</Link>
                </div>
            </div>
            <div className="other-nav-items">
                <div className="cart">
                    <Link to='/cart'><img src={Cart} alt="cart" /></Link>
                    {cart && <p>{cartItems.length}</p>}
                </div>
                <div className="profile">
                    <img src={Profile} alt="profile" />
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default NavBar