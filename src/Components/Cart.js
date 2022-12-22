import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CartItem({items}){
    const carts = JSON.parse(localStorage.getItem('cart'))
    const remove=(itemName)=>{
        console.log(itemName)
        const filteredCart = carts.filter(cartItem => cartItem.item !== itemName)
        localStorage.setItem('cart', JSON.stringify(filteredCart))
    }

    return(
        <tr>
            <td className='product'>
                <img src={items.img} alt={items.item} />
                <div className="product-detail">
                    <h4>{items.item}</h4>
                    <p>Color: {items.color}</p>
                    <button onClick={()=>remove(items.item)}>Remove</button>
                </div>
            </td>
            <td>
                <p>$ {items.price}</p>
            </td>
            <td>
                <p>{items.qty}</p>
            </td>
            <td>
                <p>$ {items.price * items.qty}</p>
            </td>
        </tr>
    )
}

function Cart() {
    let carts =''
    JSON.parse(localStorage.getItem('cart')) ? carts = JSON.parse(localStorage.getItem('cart')) : carts = ""
    const [cart, setCart]= useState(carts)
    const subTotal = ()=>{
        if(cart){
            let subtotal = 0
            for(let items of cart){
            subtotal = subtotal + items.price
        }
            return <p>$ {subtotal}</p>
        }
    }

    function getDiscount(e){
        e.preventDefault()
        if(e.target[0].value === "DISCOUNT20"){
            localStorage.setItem('discount',20)
            e.target[0].value = ""
        }
        return
    }

  return (
    <div className='cart-container'>
        <div className="cart">
            <div className="cart-table">
                <table>
                    <thead>
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                     {cart && cart.map((items)=> <CartItem items={items} key={items.img}/>)}
                    </tbody>
                </table>
                <hr />
            </div>
            <div className='discount'>
                <h3>Promotion Code?</h3>
                <form onSubmit={getDiscount}>
                    <input type="text" placeholder='Enter Coupon Code' />
                    <button>Apply</button>
                </form>
        </div>
        </div>
        
        <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="total">
                <h4>Sub Total</h4>
                {subTotal()}
            </div>
            <p>Taxes and shipping calculated at checkout</p>
            <Link to='/checkout'><button>Checkout</button></Link>
        </div>
    </div>
  )
}

export default Cart