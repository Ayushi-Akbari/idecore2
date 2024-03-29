import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import back from "../images/back.png";
import fav from "../images/favicon.png";
import favfilled from "../images/favfilled.png";
import Counter from "../components/Counter";
import { useFavorites } from "./FavScreens/FavouriteContext";
import { useCart } from "./Cart/CartContext";
import items from "../items";

const findProductById = (id) => {
  for (let item of items) {
    for (let category of item.categories) {
      const product = category.products.find(
        (product) => product.id.toString() === id
      );
      if (product) return product;
    }
  }
  return null;
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const product = findProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(true);
  // const value = 0;
  console.log("product.image_url : nfdvj : ", product.image_url[0]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    product.image_url && product.image_url.length > 0
      ? `http://localhost:4001/images/${product.image_url[0]}`
      : ""
  );

  // product ? [`http://localhost:4001/images/${product.image_url[2]}`] : null

  const [isAddToCartHovered, setIsAddToCartHovered] = useState(false);
  const [isBuyNowHovered, setIsBuyNowHovered] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.includes(product?.id));
  }, [favorites, product?.id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBackClick = () => navigate(-1);
  const handleFavoriteToggle = () => toggleFavorite(product.id);
  const updateSelectedImage = (imageUrl) => setSelectedImageUrl(imageUrl);

  return (
    <>
      <img
        src={back}
        alt="Back"
        className="cursor-pointer m-5 mb-0 w-5 h-5"
        onClick={handleBackClick}
      />
      <div className="flex flex-col lg:flex-row items-center md:items-start p-5 gap-6 ">
        <div className="w-full lg:w-1/2 h-fit flex justify-center items-center overflow-hidden border border-gray-400 rounded-lg p-8">
          <img
            src={selectedImageUrl}
            alt={product.title}
            className="max-w-full max-h-full object-contain block rounded-md"
          />
        </div>
        <div className="flex flex-row lg:flex-col gap-2.5 overflow-y-auto">
          {[
            product["image-url"],
            product["image-url-first"],
            product["image-url-second"],
            product["image-url-third"],
          ].map((imageUrl, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 border border-gray-400 rounded-lg"
              onClick={() => updateSelectedImage(imageUrl)}
              onMouseEnter={() => updateSelectedImage(imageUrl)}
            >
              <img
                src={imageUrl}
                alt={`${product.title} ${index}`}
                className="w-32 lg:w-1/2 h-fit  rounded-md"
              />
            </div>
          ))}
        </div>
        <div className="flex-2 flex flex-col justify-between p-8 w-full">
          <div>
            <h2 className="font-bold text-2xl text-[#49372B]">
              {product.title}
            </h2>
            <p className="font-light text-base text-[#49372B] mt-4 mb-4">
              {product.description}
            </p>
            <div className="mb-4">
              <Rating rating={product.rating} />
            </div>
            <p className="font-medium text-lg text-[#49372B]">
              Price: ${product.price.toFixed(2)}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <Counter quantity={quantity} setQuantity={setQuantity} />
              <button
                onClick={handleFavoriteToggle}
                className="bg-transparent border-none outline-none"
              >
                <img
                  src={isFavorite ? favfilled : fav}
                  alt="Favorite"
                  className="w-6 h-6 cursor-pointer"
                />
              </button>
            </div>
            <div className="flex gap-4">
              <button
                className={`bg-[#F6E7DC] text-[rgba(110,89,75,1)] border border-[rgba(110,89,75,1)] ${
                  isAddToCartHovered ? "bg-opacity-50" : ""
                } p-2 px-12 rounded-md`}
                onMouseEnter={() => setIsAddToCartHovered(true)}
                onMouseLeave={() => setIsAddToCartHovered(false)}
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </button>
              <button
                className={`bg-[rgba(110,89,75,1)] text-white border border-[rgba(110,89,75,1)] ${
                  isBuyNowHovered ? "bg-opacity-50" : ""
                } py-2  px-12 rounded-md`}
                onMouseEnter={() => setIsBuyNowHovered(true)}
                onMouseLeave={() => setIsBuyNowHovered(false)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
