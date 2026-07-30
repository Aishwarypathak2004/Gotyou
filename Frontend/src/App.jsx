import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/navbar';
import Footer from './components/footer';
import About from './pages/About';
import ReturnPolicy from './pages/ReturnPolicy';
import Disclaimer from './pages/Disclaimer';
import Register from './pages/register';
import Login from './pages/login';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Shop from './pages/Shop';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import AddProduct from './admin/AddProduct';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import AdminProducts from './admin/AdminProducts';
import EditProduct from './admin/EditProduct';
import AdminUsers from './admin/AdminUsers';




function App(){
  return (
   <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
        <Route path="/return" element={<ReturnPolicy/>}/>
         <Route path="/disclaimer" element={<Disclaimer/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
           <Route path="/shop" element={<Shop/>}/>
           <Route path='/ordersuccess' element={<OrderSuccess/>}/>
            <Route path='/profile' element={<Profile/>}/>


          <Route path="/admin/addproduct" element={<AddProduct/>}/>
           <Route path="/admin" element={<AdminDashboard/>}/>
            <Route path="/admin/orders" element={<AdminOrders/>}/>
             <Route path="/admin/products" element={<AdminProducts/>}/>
             <Route path="/admin/edit-product/:id" element={<EditProduct/>}/>
               <Route path="/admin/users" element={<AdminUsers/>}/>
           
      
    


         

    </Routes>
    <Footer/>
   </Router>
  )
}

export default App
