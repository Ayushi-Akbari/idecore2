import React from 'react';
import { useCart } from './CartContext'; 
import { useNavigate } from 'react-router-dom';
import CartCard from './CartCard'; 
import backgroundImage from '../../images/CART.gif';
import bag from '../../images/bag.png';
import back from '../../images/back.png';

const CartScreen = () => {
  const { cartItems, calculateTotal, removeFromCart, updateItemQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center  px-8 lg:px-0 lg:items-center lg:justify-between">
    
      <div className="w-full lg:w-[60%] px-8 flex flex-col items-center">
      
        {cartItems.length > 0 ? (
          <>
            <div className="flex items-center  gap-4 mt-8 ">
            <div className="flex">
          <img
            src={back}
            alt="Back"
            className="cursor-pointer w-5 left-5 h-5 mx-8 my-8 flex"
            onClick={handleBackClick}
          />
          </div>
              <img src={bag} alt="Bag" className="w-16 h-16" />
              <div>
                <div className="font-bold text-lg text-brown-800">CART ITEMS</div>
                <div className="flex flex-col items-center">
                  <p className="font-light text-sm text-brown-800">CHECK OUT YOUR CART</p>
                </div>
              </div>
            </div>
            <div className="w-full hidden md:flex text-center justify-between pb-4 border-b-2 border-brown-300 font-bold">
              <span className="w-40">Item</span>
              <span className="w-20">Price</span>
              <span className="w-20">Quantity</span>
              <span className="w-20">Total Price</span>
              <span className="w-10"></span>
            </div>
            {cartItems.map(item => (
              <CartCard
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateItemQuantity}
              />
            ))}
          </>
        ) : (
          <>
            <div className="w-30 h-30 bg-no-repeat bg-contain bg-center mb-4" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <p>Your cart is empty.</p>
          </>
        )}
      </div>
      <div className="w-full lg:w-[35%] lg:h-screen  bg-custom-brown-light bg-opacity-50 rounded-md p-4 mt-8 lg:mt-0">
        <h2 className="mt-20 mb-8 text-2xl font-bold text-brown-800">Cart Total</h2>
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-brown-800 mb-2">Total Cart Value:</h3>
          <h3 className="text-base text-brown-800">${calculateTotal()}</h3>
        </div>
        <div className='flex flex-col space-y-5'>
          <button onClick={clearCart} className="w-full py-2 px-4 cursor-pointer text-white bg-custom-brown rounded-md border-none">
            Clear Cart
          </button>
          <button onClick={() => alert('Proceed to Checkout')} className="w-full py-2 px-4 cursor-pointer text-white bg-custom-brown rounded-md border-none">
            Buy 
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
