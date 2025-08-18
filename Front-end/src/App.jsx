import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/login'
import Productlist from './pages/productlist'
import Cart from './pages/cart'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import PrivateRoute from './components/privateroute.jsx'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route element={<PrivateRoute/>}>
      <Route path='/productlist' element={<Productlist/>} />
      <Route path='/cart' element={<Cart/>} />
      </Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App