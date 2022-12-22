import React, { useState, useEffect } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#666" },
			"::placeholder": { color: "#666" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

function Payment() {
    // const [success, setSuccess] = useState(false)
    const [displayMsg, setDisplayMsg] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const total = JSON.parse(localStorage.getItem('total'))
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })

        if(!error){
            try{
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:8000/payments", {
                    amount: total,
                    id: id
                })

                if(response.data.success){
                    console.log("successful payment")
                    let cardElement = elements.getElement(CardElement)
                    cardElement.clear()
                    setDisplayMsg(true)
                }
            } catch(error){
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    } 
  return (
    <>
    
        {/* {!success &&  */}
        <form className='elements' onSubmit={handleSubmit}>
            <h2>Payment Form</h2>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        {/* } */}

        {displayMsg && 
            <div className='thank-you-msg'>
                <p>Your payment has been successful. Thank you for shopping with us. Hope you have a great day!!</p>
            </div>
        }
    </>
  )
}

export default Payment