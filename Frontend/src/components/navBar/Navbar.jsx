import React, { useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import {FaBoxOpen, FaSignOutAlt, FaUserCircle} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [menu,setMenu] = useState("Home");
  const[isUserLabelOpen,setIsUserLabelOpen] = useState(false);
  const navigate = useNavigate();

const userDropdown = () => setIsUserLabelOpen(!isUserLabelOpen);


const onClickOrders = () => {
  setIsUserLabelOpen(!isUserLabelOpen)
  navigate("/orders")

}
const handleLogout = () => {
  localStorage.removeItem('token');
    localStorage.removeItem('userId');
  alert("Logout Successfully")
  
}


const onClickMenu = ()=>{
  setMenu("Menu");
 
}
  return (  
    <div className='navbar'>
      
      <img src={assets.logoOrange} alt='' className='logo'/>
      <ul className='navbar-menu'>
        <Link to='/home'><li onClick={()=>setMenu("Home")} className={menu === "Home" ?"active":""} >Home</li></Link>
        <a href='#explore'><li onClick={onClickMenu} className={menu === "Menu" ?"active":""}>Menu</li></a>
        <a href='#help'><li onClick={()=>setMenu("Help")} className={menu === "Help" ?"active":""}>Help</li></a>
        <a href='#about'><li onClick={()=>setMenu("About")} className={menu === "About" ?"active":""}>About</li></a>
      </ul>
      <div className='join-icons'>
        <div className='navbar-search-icon'>
            <i className="fa-solid fa-magnifying-glass" ></i>
            <span>Search</span>
        </div>
        <Link to='/cart'> 
          <div className='navbar-cart-icon'>
                <i className="fa-solid fa-basket-shopping"></i>
                <span>Cart</span>
            </div>
            </Link>
            <div className='relative inline-block text-left'>
            <button onClick={userDropdown} className='flex items-center space-x-2 text-black px-4 py-2 rounded-lg hover:text-orange-500'>
              <FaUserCircle /><span>Profile</span>
            </button>
            {isUserLabelOpen && (
              <div className='absolute right-2  z-50 mt-4 w-35  border-gray-500 rounded-lg shadow-lg'>
               <div className='block flex items-center space-x-2 text-black px-4 py-2 rounded-lg hover:text-gray-600'>
                <FaBoxOpen/>
               <p onClick={onClickOrders}>Orders</p>
               </div>
              <div className='flex items-center space-x-2 text-black px-4 py-2 rounded-lg hover:text-gray-600'>
                <FaSignOutAlt/>
                <Link  to='/landingPage' onClick={handleLogout}>Logout</Link>
                </div>
              </div>
            )}
            </div>

          
      </div>
    </div>
  )
}

export default Navbar
