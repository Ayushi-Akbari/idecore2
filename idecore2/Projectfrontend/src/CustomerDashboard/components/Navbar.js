import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={() => handleNavigation(to)}
      className={`block py-2 pr-1 pl-3 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-white ${
        isActive(to) ? 'font-bold bg-transparent' : 'hover:bg-[rgba(73,47,29,0)]'
      }`}
    >
      {children}
    </Link>
  );

  return (
<nav className="bg-[rgba(73,47,29,1)] w-full z-20 top-0 start-0 sticky mb-0">
      <div className="max-w-screen-xl flex items-center justify-between md:justify-start mx-auto pl-6  py-3">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain rounded-lg border-2 border-[#49372B]" />
        </Link>
        
        <div className={`${isOpen ? "block" : "hidden"} md:flex md:flex-row md:items-center  md:space-x-8 md:mt-0 md:text-sm md:font-medium md:w-full md:justify-between justify-self-center`} id="navbar-sticky">
          <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium">
            <li><NavLink to="/CustomerDashboard">Home</NavLink></li>
            <li><NavLink to="/CustomerDashboard/AboutUs">About</NavLink></li>
            <li><NavLink to="/CustomerDashboard/Store">Store</NavLink></li>
          </ul>
          <div className="flex items-center right-0 justify-end space-x-4 gap-10 ">
          <button className="bg-none border-none outline-none " onClick={() => handleNavigation('/CustomerDashboard/FavScreen')}>
              <img src={isActive('/CustomerDashboard/FavScreen') ? favfilled : fav} alt="Favorites" className="h-8 w-8 inline" />
            </button>
           
           
            <button className="bg-none border-none outline-none  " onClick={() => handleNavigation('/CustomerDashboard/CartScreen')}>
              <img src={isActive('/CustomerDashboard/CartScreen') ? cartfilled : cart} alt="Cart" className="h-8 w-8 inline" />
            </button>

            <button className="bg-none border-none outline-none " onClick={() => handleNavigation('/CustomerDashboard/LoginScreen')}>
              <img src={profile} alt="Profile" className="h-8 w-auto object-contain" />
            </button>
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
