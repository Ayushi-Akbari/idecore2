import React from "react";
import Rating from "../components/Rating";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, imageUrl, title, description, price, rating }) => {
  const navigate = useNavigate();

  console.log("id : ", id);

  const openProductDetails = () => navigate(`/CustomerDashboard/product/${id}`);

  return (
    <div
      className="flex flex-col w-1/5 cursor-pointer p-2 border border-gray-300 rounded-lg bg-white hover:shadow-lg transition-shadow ease-in-out duration-300"
      onClick={openProductDetails}
    >
      <div className="w-full h-56 overflow-hidden rounded-t-lg">
        <img
          src={`http://localhost:4001/images/${imageUrl}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4 flex flex-col p-2">
        <div className="flex flex-col mb-4">
          <span className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
            {title}
          </span>
          <span className="text-md text-gray-500 line-clamp-2">
            {description}
          </span>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-medium">{price}</span>
          <Rating rating={rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
