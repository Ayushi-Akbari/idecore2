import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "./FavouriteContext";
import items from "../../items";
import FavCard from "./FavCard";
import back from "../../images/back.png";

const FavScreen = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const { favorites, removeFavorite } = useFavorites();
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

  // Assuming removeFavorite is a method in your context to remove a favorite
  const handleRemove = (id) => {
    removeFavorite(id); // Update context state
  };

  return (
    <>
      <img
        src={back}
        alt="Back"
        style={{
          cursor: "pointer",
          margin: "0vw 2vw",
          width: "20px",
          height: "20px",
          marginTop: "1vw",
        }}
        onClick={handleBackClick}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "2rem",
          marginBottom: "6vw",
          padding: "1vw 2vw",
          backgroundColor: "rgba((230,222,213,0.4)",
        }}
      >
        {userCookie &&
          data.map((product) => (
            <FavCard
              key={product._id}
              id={product._id}
              imageUrl={product.image_url[0]}
              title={product.title}
              description={product.description}
              price={`${product.price.toFixed(2)}`}
              onRemove={() => handleRemove(product._id)} // Pass handleRemove as a prop
            />
          ))}
        {!userCookie &&
          favCookie.map((product) => (
            <FavCard
              key={product._id}
              id={product._id}
              imageUrl={product.image_url[0]}
              title={product.title}
              description={product.description}
              price={`${product.price.toFixed(2)}`}
              onRemove={() => handleRemove(product._id)} // Pass handleRemove as a prop
            />
          ))}
      </div>
    </>
  );
};

export default FavScreen;
