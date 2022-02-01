import React, { useState,useEffect } from 'react';
import { commerce } from './lib/commerce';
import NavBar from './components/NavBar/NavBar';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import { Routes, Route } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout';

function App() { 
  
  const [products, setProducts] = useState([]);
  const [cart,setCart] = useState({});


//fetching products from commerce.js website 
const fetchProduct = async () => {
  const { data } = await commerce.products.list();
  setProducts(data);
}

//fetching Cart items from commerce.js website 
const fetchCart = async () => {
  setCart(await commerce.cart.retrieve());
}

// Adding item to Cart using async
const handleAddtoCart = async (productId, quantity) => {
const {cart} = await commerce.cart.add(productId, quantity);
setCart(cart);
}

const handleUpdateCartQty = async (productId, quantity) => {
  const {cart} = await commerce.cart.update(productId, {quantity});
  setCart(cart);
}

const handleRemoveFromCart = async (productId) => {
  const {cart} =  await commerce.cart.remove(productId);
  setCart(cart);
}

const handleEmptyCart = async () => {
  const {cart} = await commerce.cart.empty();
  setCart(cart);
}





useEffect(() => {
  fetchProduct();
  fetchCart();
}, []);





  return ( 
      <>
        <NavBar totalItems={cart.total_items}/>
        <Routes>
          <Route path='/' element={<Products products={products} handleAddtoCart={handleAddtoCart}/>} />
          <Route path='/cart' element={<Cart 
            cart={cart}
            handleUpdateCartQty={handleUpdateCartQty} 
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart ={handleEmptyCart }
            />} 
            />
            <Route path='/checkout' element={<Checkout/>} />
        </Routes>

      </>

  )}

export default App;
