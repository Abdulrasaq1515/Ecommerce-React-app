import React, { useEffect, useState } from 'react';
import { useGetAllProductsQuery } from '../api/productApi';
import DressStyle from "../assets/dressStyle/DressStyle.jsx";
import Star from "../assets/star/Star.jsx";

const AllProducts = () => {
  const { data = [], isLoading, isError, error } = useGetAllProductsQuery();
  const [visibleCount, setVisibleCount] = useState(4);
  const [newArrivals, setNewArrivals] = useState([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const sorted = data.slice().sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
      setNewArrivals(sorted);
    } else {
      setNewArrivals([]);
    }
  }, [data]);

  useEffect(() => {
    setVisible(newArrivals.slice(0, visibleCount));
  }, [newArrivals, visibleCount]);
  if (isLoading)
    return <div className="loading-state">Loading products…</div>;
  if (isError)
    return <div className="error-state">Failed to load: {String(error?.status || error?.error || 'Unknown error')}</div>;
  return (
    <section className="products-section">
      <div className="new-arrivals">
        <h1>NEW ARRIVALS</h1>
      </div>
      <div className="products-grid">
        {visible.map((product) => (
          <li key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                loading="lazy"/>
            </div>
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <div className="product-price">${Number(product.price).toFixed(2)}</div>
          </li>
        ))}
      </div>
      {visibleCount < newArrivals.length && (
        <div className="view-all-container">
          <button type="button" onClick={() => setVisibleCount((c) => Math.min(c + 4, newArrivals.length))}
            className="view-all-button">View All
          </button>
        </div>
      )}
      <div className="dress-styles">
        <h1 className="dress-front">BROWSE BY DRESS STYLES</h1>
        <DressStyle />
      </div>
      <div className= "happy-customer">
        <h1> OUR HAPPY CUSTOMERS </h1>
        <img src="/src/assets/arrow-down-bold 1.jpg" alt=""/>
        <img src="/src/assets/arrow-down-bold 2.jpg" alt=""/>

          <div className="customer-reviews">
              <Star/>
              <img src="/src/assets/Frame 28.jpg" alt=""/>
              <Star/>
              <img src='/src/assets/Frame 28 (1).jpg'/>
              <Star/>
              <img src='/src/assets/Frame 28 (2).jpg'/>
          </div>
      </div>

    </section>
  );
};

export default AllProducts;
