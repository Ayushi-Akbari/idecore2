import React, { useState } from 'react';
import { Link,NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import fav from '../images/navfav.png';
import favfilled from '../images/navfavfilled.png';
import profile from '../images/profile.png';
import cart from '../images/cart.png';
import cartfilled from '../images/cartfilled.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (pathname) => location.pathname === pathname;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleMenuItemClick = (itemName) => {
    console.log(itemName);  };

  return (
    <nav className="bg-[rgba(73,47,29,1)] w-full z-20 top-0 start-0 sticky mb-0">
      <div className="max-w-screen px-6 flex items-center justify-between md:justify-start mx-auto  py-3">
        <Link to="/" className="flex items-center  mr-6">
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain rounded-lg border-2 border-[#49372B]" />
        </Link>
        
        <div className={`${isOpen ? "block" : "hidden"} md:flex md:flex-row md:items-center md:space-x-8 md:mt-0 md:text-sm md:font-medium md:w-full md:justify-between justify-self-center`} id="navbar-sticky">
          <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium">
            <li><NavLink to="/"  className={`block py-2 pr-4 pl-3 text-white rounded hover:bg-[rgba(73,47,29,0.4)] md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 ${isActive('/') ? 'font-bold' : ''}`}>Home</NavLink></li>
            <li><NavLink to="/AboutUs"  className={`block py-2 pr-4 pl-3 text-white rounded hover:bg-[rgba(73,47,29,0.4)] md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 ${isActive('/AboutUs') ? 'font-bold' : ''}`} >About</NavLink></li>
            <li><NavLink to="/Store"  className={`block py-2 pr-4 pl-3 text-white rounded hover:bg-[rgba(73,47,29,0.4)] md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 ${isActive('/Store') ? 'font-bold' : ''}`} >Store</NavLink></li>
          </ul>
          <div className="flex items-center right-0 justify-end space-x-4 gap-10 ">
            <button className="bg-none border-none outline-none " onClick={() => handleNavigation('/FavScreen')}>
              <img src={isActive('/FavScreen') ? favfilled : fav} alt="Favorites" className="h-8 w-8 inline" />
            </button>
           
            <button className="bg-none border-none outline-none  " onClick={() => handleNavigation('/CartScreen')}>
              <img src={isActive('/CartScreen') ? cartfilled : cart} alt="Cart" className="h-8 w-8 inline" />
            </button>

            <div className="relative">
              <button className="bg-none border-none outline-none " onClick={toggleMenu}>
                <img src={profile} alt="Profile" className="h-8 w-auto object-contain" />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-white border w-32 mr-0 rounded shadow-md">
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-fit text-left" onClick={() => handleMenuItemClick('Help')}>Help</button>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={() => handleNavigation('/Contactus')}>Contact Us</button>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={() =>handleNavigation('/SellerDashboard')}>Seller Account</button>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={() =>handleMenuItemClick('Logout')}>Log Out</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <button className="bg-none border-none outline-none md:hidden" onClick={toggleMenu}>
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>
    </nav>
  );
}
