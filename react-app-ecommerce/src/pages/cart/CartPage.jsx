import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header.jsx';
import Footer from "../../components/Footer.jsx";
import styles from './cartPage.module.css';
import { useUpdateCartMutation } from '../../api/cartApi';
import { updateCartItemQuantity, removeFromCart } from '../../store/cartSlice';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateCart] = useUpdateCartMutation();
    const cartItems = useSelector(state => state.cart.items);

    const handleQuantityChange = async (itemId, change) => {
        const item = cartItems.find(item => item.id === itemId);
        const newQuantity = Math.max(1, item.quantity + change);

        dispatch(updateCartItemQuantity({ id: itemId, quantity: newQuantity }));

        await updateCart({
            items: cartItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        });
    };

    const handleRemoveItem = async (itemId) => {
        dispatch(removeFromCart(itemId));
        await updateCart({ items: cartItems.filter(item => item.id !== itemId) });
    };

    const DISCOUNT = 0.2;
    const subtotal = cartItems.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
    const discountAmount = subtotal * DISCOUNT;
    const totalAfterDiscount = subtotal - discountAmount;
    return (
        <div>
            <Header />
            <div className={styles["cart-container"]}>
                <h1 className={styles["cart-title"]}>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <div className={styles["empty-cart"]}>
                        <p className={styles["empty-cart-message"]}>Your cart is empty</p>
                        <button className={styles["continue-shopping"]} onClick={() => navigate('/')}>Continue Shopping</button>
                    </div>
                ) : (
                    <>
                        <div className={styles["cart-main"]}>
                            <div className={styles["cart-items"]}>
                                {cartItems.map(item => (
                                    <div key={item.id} className={styles["cart-item"]}>
                                        <img src={item.image} alt={item.title} className={styles["item-image"]}/>
                                        <div className={styles["item-details"]}>
                                            <h3 className={styles["item-name"]}>{item.title}</h3>
                                            <p className={styles["item-price"]}>${(item.price || 0).toFixed(2)}</p>
                                            <div className={styles["item-quantity"]}>
                                                <div className={styles["quantity-controls"]}>
                                                    <button className={styles["qty-btn"]} onClick={() => handleQuantityChange(item.id, -1)} aria-label="Decrease quantity">-</button>
                                                    <span className={styles["qty-display"]}>{item.quantity}</span>
                                                    <button className={styles["qty-btn"]} onClick={() => handleQuantityChange(item.id, 1)} aria-label="Increase quantity">+</button>
                                                </div>
                                                <button className={styles["remove-btn"]} onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles["cart-summary"]}>
                                <div className={styles["summary-row"]}>
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className={styles["summary-row"]}>
                                    <span>Discount (20%)</span>
                                    <span>-${discountAmount.toFixed(2)}</span>
                                </div>
                                <div className={styles["summary-row"]}>
                                    <span>Delivery fees</span>
                                    <span>Free</span>
                                </div>
                                <div className={`${styles["summary-row"]} ${styles["summary-total"]}`}>
                                    <span>Total</span>
                                    <span>${totalAfterDiscount.toFixed(2)}</span>
                                </div>
                                <button className={styles["checkout-btn"]}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;