import React from "react";
import ProductCard from "../../components/ProductCard";

const ProductList = ({ products }) => {
  const containerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "2rem",
    marginBottom: "6vw",
    width: "80vw",
    padding: "2vw 2vw",
    alignItems: "center",
    backgroundColor: "rgba((230,222,213,0.4)",
  };

  console.log("products : ", products);

  return (
    <div style={{ alignItems: "center" }}>
      <div style={containerStyles}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            imageUrl={product.image_url[0]}
            title={product.title}
            description={product.description}
            price={`$${product.price.toFixed(2)}`}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
