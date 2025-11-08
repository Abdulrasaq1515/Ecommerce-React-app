import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { useGetProductByIdQuery } from '../../api/productApi';
import { addToCart } from '../../store/cartSlice';
import styles from './productDetails.module.css';
import Reviews from "../../components/Reviews.jsx";

const ProductDetails = () => {
        const { id } = useParams();
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const [quantity, setQuantity] = useState(1);
        const { data: product, isLoading, isError, error } = useGetProductByIdQuery(id);

        const handleQuantityChange = (change) => {
            const newQuantity = quantity + change;
            if (newQuantity >= 1) {
                setQuantity(newQuantity);
            }
        };

        const handleAddToCart = () => {
            if (product) {
                dispatch(addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                }));
            }
        };

        return (
                <div>
                        <Header />
                        <div className={styles["breadcrumb"]}>
                            <p>Home</p>
                            <p>Shop</p>
                            <p>Men</p>
                            <p>T-shirt</p>
                        </div>
                        <main className={styles["products-section"]}>
                            {isLoading && <div className={styles["loading-state"]}>Loading product...</div>}
                            {isError && <div className={styles["error-state"]}>Failed to load product: {String(error?.status || error?.error)}</div>}
                            {product && (
                                <div className={styles["product-card"]}>
                                    <div className={styles['product-image-wrap']}>
                                        <img src={product.image} alt={product.title} className={styles['product-image']} />
                                    </div>
                                    <div className={styles['product-info']}>
                                        <h1 className={styles['product-title']}>{product.title}</h1>
                                        <p className={styles['product-price']}>${Number(product.price).toFixed(2)}</p>
                                        <p className={styles['product-description']}>{product.description}</p>
                                        <p className={styles['product-category']}>Category: {product.category}</p>
                                        
                                        <div className={styles["cart-controls"]}>
                                            <div className={styles["quantity-controls"]}>
                                                <button className={styles["qty-btn"]} onClick={() => handleQuantityChange(-1)} aria-label="Decrease quantity">-</button>
                                                <span className={styles["qty-display"]}>{quantity}</span>
                                                <button className={styles["qty-btn"]} onClick={() => handleQuantityChange(1)} aria-label="Increase quantity">+</button>
                                            </div>
                                            <button className={styles["add-to-cart"]} onClick={handleAddToCart}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </main>
                        <div className={styles["rating"]}>
                            <h2>Products Details</h2>
                                <h2>Product Information</h2>
                            <h2>FAQs</h2>
                        </div>
                        <div>
                                <h2 className={styles["reviews-title"]}>Ratings & Reviews</h2>
                            {product && <Reviews productId={product.id} />}
                        </div>

                        <Footer />
                </div>
        )
}
export default ProductDetails