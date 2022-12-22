import React, { useEffect, useState, useContext, createContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CartPoPUp from './CartPoPUp'
import { CartContext } from '../App'


// Not needed probably - delete everyline related to this context if remooved from here
export const SelectionColorContext = createContext({})

let cart =[]

function SingleProduct() {

    const { id } = useParams()
    const [products, setProducts] = useState('')
    const [selectedColor, setSelectedColor] = useState("")
    const [alert, setAlert] = useState('alert-msg')
    const { cartItems, setCartItems } = useContext(CartContext)
    
    const getPageData = async()=>{
        try{
            const response = await axios.get(`http://localhost:8000/product/${id}`,{id:id});
            setProducts(response.data);
        } catch(e){
            console.log(e)
        }
     }
    function handleSubmit(e){
        e.preventDefault()
        if(!selectedColor){
            setAlert("")
            return
        }

        cart.push({'item':products.name, 'color': selectedColor, "qty": e.target[0].value, "img": products.img?.img1, "price":products.price })
        localStorage.setItem('cart', JSON.stringify(cart))
        setAlert("alert-msg")
        updateContext()
    }

    function updateContext(){
        let cart = JSON.parse(localStorage.getItem('cart'))
        setCartItems(cart)
    }

    function selectColor(e){
        setSelectedColor(e.target.innerHTML)
    }
    useEffect(()=>{
        getPageData()
    })

  return (
    <>
    <SelectionColorContext.Provider value={{selectedColor}} >
    <div className='single-product'>
        <div className="picture">
            <div className="main-picture">
                <img className='main-pic' src={products.img?.img1} alt={products.name} />
            </div>
            <div className="extra-picture">
                <img src={products.img?.img2}  alt={products.name} className="secondary-pic" />
                <img src={products.img?.img3}  alt={products.name} className="secondary-pic" />
            </div>
        </div>
        <div className="description">
            <h1>{products.name}</h1>
            <h4>${products.price}</h4>
            <form action="submit" onSubmit={handleSubmit} >
                <input type="number" min="1" defaultValue="1" size="3" name='qty' id='qty' required />
                <button type='submit'>Add to Cart</button>
                
             </form>
             <div className="product-options">
                {products.color && products.color.map((color)=><DiffColor selectColor={selectColor} selectedColor={selectedColor}  key={`${color+products._id}`} color={color} />)}
                
            </div>
            <div className="alert">
                <h5 className={alert}>Please choose color variant before adding to cart</h5>
            </div>
        </div>
        {localStorage.getItem('cart') && <CartPoPUp />}
    </div>
    </SelectionColorContext.Provider>
    </>
  )
}

function DiffColor({color, selectColor, selectedColor}){

    return(
        <div className={ selectedColor === color ? "true options": "options"}>
            <p onClick={(e)=>{selectColor(e)}}>{color.toUpperCase()}</p>
        </div>
    )
}

export default SingleProduct