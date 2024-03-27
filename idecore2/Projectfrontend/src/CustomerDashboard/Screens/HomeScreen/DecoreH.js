import { React, useEffect, useState } from "react";
import items from "../../items";
import Homecard from "../../components/Homecard";
import axios from "axios";

const DecoreH = () => {
  const homeDecorCategory = items[0].categories.find(
    (category) => category.name === "Home Decor"
  );
  const homeDecorProducts = homeDecorCategory ? homeDecorCategory.products : [];

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4001/category")
      .then((res) => {
        setCategoryFilter(res.data.data[0].name);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4001/filterByCategory", {
        categoryFilter: categoryFilter,
      })
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // }
  }, [categoryFilter]);

  return (
    <div className="mb-24">
      <div className="text-center p-8">
        <p className="font-bold text-3xl lg:text-4xl text-[#49372B] mb-1">
          DECORE YOUR HOME
        </p>
        <div className="mx-auto py-1 w-full md:w-1/2 lg:w-1/3">
          <p className="font-light md:text-base  text-s text-[#49372B]">
            ELEVATE YOUR SPACE WITH ELEGANCE
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly gap-2">
        {data.map((product) => (
          <Homecard
            key={product.id}
            id={product.id}
            imageUrl={product.image_url[0]}
            title={product.title}
            price={`$${product.price.toFixed(2)}`}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default DecoreH;
