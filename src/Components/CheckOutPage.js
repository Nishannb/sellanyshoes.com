import React, {useState} from 'react'
import StripeContainer from './StripeContainer'



function TableData({items}){
    return(
      <>
      <tr className='table-row'>
        <div className="item-details">
          <td>
            <img src={items.img} alt={items.item} />
          </td>
          <td>  
            <h3>{items.item}</h3>
            <p>Color: {items.color}</p> 
          </td>
        </div>
        <td>$ {items.price}</td>
 
      </tr>
      </>
    )
}

function CheckOutPage() {
  let carts = ''
  let discount = 0
  JSON.parse(localStorage.getItem('cart')) ? carts = JSON.parse(localStorage.getItem('cart')) : carts = ""
  JSON.parse(localStorage.getItem('discount')) ? discount = JSON.parse(localStorage.getItem('discount')) : discount = 0
  const[ showPayment, setShowPayment ] = useState(false)
  const [cart, setCart]= useState(carts)

  function showPaymentForm(e) {
    e.preventDefault()
    setShowPayment(true)
  }

   const subTotal = (discount)=>{
        let subtotal = 0
        for(let items of cart){
            subtotal = subtotal + items.price
        }
        if(discount){
          subtotal = subtotal - (discount/100) * subtotal
        }
        localStorage.setItem('total', subtotal)
        return <p>$ {subtotal}</p>
    }
  return (
    <div className='checkout-container'>
      <div className="shippingandpayment">
        <h2>Shipping Details</h2>
        <p>Contact information {">"} <span> Shipment </span> {">"} <span> Payment</span></p> 
        <form onSubmit={showPaymentForm}>
          <div className="personal-info">
              <input type="text" placeholder='Full Name'  required/>
              <input type="email" name="email" id="email" placeholder='Email' required />
            </div>
            <div className="details" >
            <input type="text" placeholder='Address' required />
            </div>
            <div className="details">
              <input type="text" placeholder='City' required />
              <input type="text" placeholder='Postal Code' required />
            </div>
            <button>Continue to payment</button>
        </form>
        {showPayment && <StripeContainer />}
      </div>
      <hr />
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <table>
          <tbody>
              {cart && cart.map((items)=><TableData items={items} key={items.img} />)}
          </tbody>
        </table>
        <div className="summary">
          <div className="sub-summary">
            <h3>Subtotal</h3>
            <p>{cart.length} items</p>
            {subTotal()}
          </div>
          <div className="sub-summary">
            <h4>Discount</h4>
            <p>{discount}%</p>
            
          </div>
          <hr />
          <div className="sub-summary">
            <h3>Total</h3>
            <p>{subTotal(discount)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutPage