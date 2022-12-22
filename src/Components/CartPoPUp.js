import React, { useContext } from 'react'
import { CartContext } from '../App'
import { Link } from 'react-router-dom'

function CartPoPUp() {

    // const { cartItems, setCartItems } = useContext(CartContext)
    const cart = JSON.parse(localStorage.getItem('cart'))
    
  return (
    <div className='cart-popup'>
        <h2>Cart Items <hr /></h2>
        
        {cart && cart.map((items)=><Items items={JSON.stringify(items)} />)}
        
        <Link to='/cart'>View Cart ({cart.length}) </Link>
    </div>
  )
}

function Items({items}){
    let cart = JSON.parse(items)
    return(
        <>
        <div className='cart-card'>
            <div>
                <img src={cart.img} alt="img" />
            </div>
            <h4>{cart.item}</h4>
            <p>Qty: {cart.qty}</p> 
        </div>
        </>
    )
}

export default CartPoPUp