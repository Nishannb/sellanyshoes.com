import './App.css';
import NavBar from './Components/NavBar';
import Content from './Components/Content';
import Homepage from './Components/Homepage';
import ProductPage from './Components/ProductPage';
import Footer from './Components/Footer';
import {useState, createContext} from "react"
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import SingleProduct from './Components/SingleProduct';
import CheckOutPage from './Components/CheckOutPage';
import Cart from './Components/Cart';

export const CategoryContext = createContext({})
export const CartContext = createContext({})

function App() {

  const cart = JSON.parse(localStorage.getItem('cart'))

  const [ products, setProducts ] = useState("")
  const [ cartItems, setCartItems ] = useState(cart)

  
  return (
    <CategoryContext.Provider value={{products, setProducts}}>
    <CartContext.Provider value={{cartItems, setCartItems}}>
      <BrowserRouter BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/category/:id' element={<ProductPage />} />
              <Route path='/product/:id' element={<SingleProduct />} />
              <Route path='/checkout' element={<CheckOutPage />} />
              <Route path='/cart' element={<Cart />} />
          </Routes>
          <Footer />
        </div>  
      </BrowserRouter>
    </CartContext.Provider> 
    </CategoryContext.Provider>
  );
}

export default App;
