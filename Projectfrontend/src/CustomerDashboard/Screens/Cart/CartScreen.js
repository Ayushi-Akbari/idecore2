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
    <div className="flex flex-col md:flex-row justify-center items-start px-4 md:px-0">
      <img
        src={back}
        alt="Back"
        className="cursor-pointer ml-2 md:ml-0 w-8 h-8 mt-2"
        onClick={handleBackClick}
      />
      <div className="w-full md:w-2/3 mx-2 md:mx-0 mt-8 md:mt-0">
        {cartItems.length > 0 ? (
          <>
            <div className="flex justify-center items-center gap-4">
              <img src={bag} alt="Bag" className="w-10 h-10" />
              <div>
                <div className="font-bold text-3xl md:text-4xl">CART ITEMS</div>
                <div className="text-lg">CHECK OUT YOUR CART</div>
              </div>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span className="w-1/4">Product</span>
              <span className="w-1/6">Price</span>
              <span className="w-1/6">Quantity</span>
              <span className="w-1/6">Total</span>
              <span className="w-1/6"></span>
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
          <div className="flex flex-col items-center mt-8">
            <div className="w-2/3 h-2/3 mx-auto bg-no-repeat bg-contain bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <p className="text-lg mt-4">Your cart is empty.</p>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/3 mt-8 md:mt-0 mx-2 md:mx-0">
        <div className="bg-opacity-50 bg-gray-200 rounded p-4 md:min-h-screen">
          <h2 className="font-bold text-2xl mt-4 mb-4">Cart Total</h2>
          <div className="my-4">
            <h3 className="font-semibold text-lg mb-2">Total Cart Value:</h3>
            <h3 className="text-lg">${calculateTotal()}</h3>
          </div>
          <div className="flex justify-center md:justify-start space-x-4">
            <button onClick={clearCart} className="w-full md:w-auto bg-indigo-600 text-white py-2 px-6 md:px-4 rounded">Clear Cart</button>
            <button onClick={() => alert('Proceed to Checkout')} className="w-full md:w-auto bg-red-600 text-white py-2 px-6 md:px-4 rounded">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
