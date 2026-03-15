import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from "./components/Footer/Footer";
import LoginPop from "./components/LoginPop/LoginPop";
import Verify from "./pages/Verify/Verify";
import MyOrder from "./pages/MyOrder/MyOrder";
const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPop setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/order' element={<PlaceOrder/>}></Route>
          <Route path='/verify' element={<Verify/>}></Route>
          <Route path='/myorder' element={<MyOrder/>}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
