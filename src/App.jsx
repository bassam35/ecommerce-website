// import React from 'react';

// STYLE
import './App.css';

// COMPONENTS
import Navbar from './components/Navbar';

// PAGES
import Home from './pages/Home';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';

// ROUTING
import { Routes, Route } from 'react-router-dom';

// CONTEXT PROVIDER
import AuthProvider from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
