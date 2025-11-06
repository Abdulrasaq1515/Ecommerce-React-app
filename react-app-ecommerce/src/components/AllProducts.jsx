import React, { useEffect, useState } from 'react';
import { useGetAllProductsQuery } from '../api/productApi.jsx';
import DressStyle from "../assets/dressStyle/DressStyle.jsx";
import Star from "../assets/star/Star.jsx";
import { useNavigate } from 'react-router-dom';
import styles from '../pages/landingPage/landingPage.module.css';


const AllProducts = () => {
  const { data = [], isLoading, isError, error } = useGetAllProductsQuery();
  const [visibleCount, setVisibleCount] = useState(4);
  const [newArrivals, setNewArrivals] = useState([]);
  const [visible, setVisible] = useState([]);
  const navigate = useNavigate();

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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  
  if (isLoading)
    return <div className={styles["loading-state"]}>Loading products…</div>;
  if (isError)
    return <div className={styles["error-state"]}>Failed to load: {String(error?.status || error?.error || 'Unknown error')}</div>;
  return (
    <section className={styles["products-section"]}>
      <div className={styles["new-arrivals"]}>
        <h1>NEW ARRIVALS</h1>
      </div>
      <div className={styles["products-grid"]}>
        {visible.map((product) => (
          <li key={product.id} className={styles["product-card"]}>
            <div className={styles["product-image-container"]}>
              <img src={product.image} alt={product.title} className={styles["product-image"]} loading="lazy" onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }} />
            </div>
            <h2 className={styles["product-title"]}>{product.title}</h2>
            <p className={styles["product-description"]}>{product.description}</p>
            <div className={styles["product-price"]}>${Number(product.price).toFixed(2)}</div>
          </li>
        ))}
      </div>
      {visibleCount < newArrivals.length && (
        <div className={styles["view-all-container"]}>
          <button type="button" onClick={() => setVisibleCount((c) => Math.min(c + 4, newArrivals.length))}
            className={styles["view-all-button"]}>View All
          </button>
        </div>
      )}
      <div className={styles["dress-styles"]}>
        <h1 className={styles["dress-front"]}>BROWSE BY DRESS STYLES</h1>
        <DressStyle />
      </div>
      <div className={styles["happy-customer"]}>
          <div>
              <h1> OUR HAPPY CUSTOMERS </h1>
          </div>
          <div className={styles["arrows"]}>
              <img src="/src/assets/image/arrow-down-bold 1.jpg" alt=""/>
              <img src="/src/assets/image/arrow-down-bold 2.jpg" alt=""/>
          </div>
      </div>
          <div className={styles["customer-reviews"]}>
              <Star/>
              <img src="/src/assets/image/Frame 28.jpg" alt=""/>
              <Star/>
              <img src='/src/assets/image/Frame 28 (1).jpg'/>
              <Star/>
              <img src='/src/assets/image/Frame 28 (2).jpg'/>
          </div>
    </section>
  );
};

export default AllProducts;
