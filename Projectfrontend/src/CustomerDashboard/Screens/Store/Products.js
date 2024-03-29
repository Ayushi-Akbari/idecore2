import React, { useState, useEffect } from 'react';
import items from '../../items';
import ProductFilters from './ProductFilter'; 
import ProductList from './ProductList'; 

const Products = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    const categories = new Set();
    items.forEach(item => {
      item.categories.forEach(category => {
        categories.add(category.name);
      });
    });
    setUniqueCategories(Array.from(categories));
  }, []);

  let allProducts = [];
  items.forEach(item => {
    item.categories.forEach(category => {
      if (!categoryFilter || category.name === categoryFilter) {
        allProducts = [...allProducts, ...category.products];
      }
    });
  });

  if (ratingFilter) {
    allProducts = allProducts.filter(product => product.rating >= ratingFilter);
  }

  if (sortPrice === 'high-to-low') {
    allProducts.sort((a, b) => b.price - a.price);
  } else if (sortPrice === 'low-to-high') {
    allProducts.sort((a, b) => a.price - b.price);
  }

  return (
    <div className='flex flex-col lg:flex-row max-w-screen'>
      <ProductFilters
        uniqueCategories={uniqueCategories}
        setCategoryFilter={setCategoryFilter}
        setSortPrice={setSortPrice}
        setRatingFilter={setRatingFilter}
      />
      <ProductList products={allProducts} />
    </div>
  );
};

export default Products;
