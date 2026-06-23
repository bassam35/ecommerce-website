import React from 'react';

// STYLE
import './App.css';

// COMPONENTS
import Navbar from './components/Navbar';

// PAGES
import Home from './pages/Home';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';

// ROUTING
import { Routes, Route } from 'react-router-dom';

// CONTEXT PROVIDER
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <div className='app'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/product/:id' element={<ProductDetail />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
