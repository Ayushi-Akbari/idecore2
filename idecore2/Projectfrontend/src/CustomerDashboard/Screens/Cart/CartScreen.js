import { React, useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import CartCard from "./CartCard";
import backgroundImage from "../../images/CART.gif";
import bag from "../../images/bag.png";
import back from "../../images/back.png";
import axios from "axios";
import Cookies from "js-cookie";

const CartScreen = () => {
  const {
    // cartItems,
    calculateTotal,
    removeFromCart,
    getCartData,
    updateQuantity,
    // clearCart,
  } = useCart();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const [items, setItems] = useState([]);

  const userCookie = Cookies.get("user");

  // const [cartCookie, setCartCookie] = useState([]);

  const cartCookieString = Cookies.get("cartItems");
  const cartCookie = cartCookieString ? JSON.parse(cartCookieString) : [];

  console.log("cartCookie:", cartCookie);

  useEffect(() => {
    console.log(
      "cartCooksdsdie : ",
      // JSON.parse(cartCookieString)
      cartCookie,
      data
    );
  }, [cartCookie]);

  // const queryParams = new URLSearchParams(userCookie).toString();

  const [data, setData] = useState({ total: 0, items: [] });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("userCookie 123 : ", userCookie);
        if (userCookie) {
          console.log("Ayushi");
          const res = await axios.get(`http://localhost:4001/cart/`, {
            headers: {
              Authorization: `Bearer ${userCookie}`, //
            },
          });
          console.log("res.data.data : ", res);
          setData({
            total: res.data.data[0].total,
            items: res.data.data[0].items,
          });
          setTotal(res.data.data[0].total);
        } else {
          setTotal(calculateTotal);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [userCookie]);

  // console.log("data :", data);

  const updateItemQuantity = async (id, quantity) => {
    console.log("id : ", id);
    console.log("quantity : ", quantity);

    try {
      if (userCookie) {
        const res1 = await axios.put(
          `http://localhost:4001/cart/${id}`,
          { quantity },
          {
            headers: {
              Authorization: `Bearer ${userCookie}`, //
            },
          }
        );
        // console.log(res1.data);
        window.location.reload();

        const res = axios.get(`http://localhost:4001/cart/`, {
          headers: {
            Authorization: `Bearer ${userCookie}`, //
          },
        });
        console.log(res.data.data);
        setData({
          total: res.data.data[0].total,
          items: res.data.data[0].items,
        });
        setTotal(res.data.data[0].total);
        window.location.reload();
      } else {
        updateQuantity(id, quantity);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clearCart = async () => {
    try {
      if (userCookie) {
        const res1 = await axios.delete("http://localhost:4001/cart/", {
          headers: {
            Authorization: `Bearer ${userCookie}`, //
          },
        });

        const res = await axios.get(`http://localhost:4001/cart/`, {
          headers: {
            Authorization: `Bearer ${userCookie}`, //
          },
        });
        console.log("res.data.data : ", res.data.data);
        setData({
          total: 0,
          items: [],
        });
        setTotal(0);
        console.log(data);
      } else {
        Cookies.remove("cartItems");
        setTotal(0);
        window.location.reload();
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  // const [data, setData] = useState([]);

  const deleteData = async (id) => {
    try {
      if (userCookie) {
        await axios.delete(`http://localhost:4001/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${userCookie}`, //
          },
        });

        const res = await axios.get(`http://localhost:4001/cart/`, {
          headers: {
            Authorization: `Bearer ${userCookie}`, //
          },
        });
        setData({
          total: res.data.data[0].total,
          items: res.data.data[0].items,
        });
        setTotal(res.data.data[0].total);
      } else {
        removeFromCart(id);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log("data : ", data.items);
  console.log("data.lemgth : ", data.items.length);
  if (userCookie) {
    console.log("true");
  } else {
    console.log("false");
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start px-4 md:px-0">
      <img
        src={back}
        alt="Back"
        className="cursor-pointer ml-2 md:ml-0 w-8 h-8 mt-2"
        onClick={handleBackClick}
      />
      <div className="w-full md:w-2/3 mx-2 md:mx-0 mt-8 md:mt-0">
        {cartCookie.length !== 0 || data.items.length !== 0 ? (
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
            {userCookie &&
              data.items.map((item) => (
                <CartCard
                  key={item._id}
                  id={item.productId}
                  item={item}
                  image_url={item.image_url}
                  title={item.product}
                  price={item.price}
                  subTotal={item.subTotal}
                  quantity={item.quantity}
                  onDelete={deleteData}
                  onUpdateQuantity={updateItemQuantity}
                />
              ))}
            {!userCookie &&
              cartCookie.map((item) => (
                <CartCard
                  key={item._id}
                  id={item._id}
                  item={item}
                  image_url={item.image_url[0]}
                  title={item.title}
                  price={item.price}
                  subTotal={item.price * item.quantity}
                  quantity={item.quantity}
                  onDelete={deleteData}
                  onUpdateQuantity={updateItemQuantity}
                />
              ))}
          </>
        ) : (
          <div className="flex flex-col items-center mt-8">
            <div
              className="w-2/3 h-2/3 mx-auto bg-no-repeat bg-contain bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
            <p className="text-lg mt-4">Your cart is empty.</p>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/3 mt-8 md:mt-0 mx-2 md:mx-0">
        <div className="bg-opacity-50 bg-gray-200 rounded p-4 md:min-h-screen">
          <h2 className="font-bold text-2xl mt-4 mb-4">Cart Total</h2>
          <div className="my-4">
            <h3 className="font-semibold text-lg mb-2">Total Cart Value:</h3>
            <h3 className="text-lg">${total}</h3>
          </div>
          <div className="flex justify-center md:justify-start space-x-4">
            <button
              onClick={clearCart}
              className="w-full md:w-auto bg-indigo-600 text-white py-2 px-6 md:px-4 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert("Proceed to Checkout")}
              className="w-full md:w-auto bg-red-600 text-white py-2 px-6 md:px-4 rounded"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
