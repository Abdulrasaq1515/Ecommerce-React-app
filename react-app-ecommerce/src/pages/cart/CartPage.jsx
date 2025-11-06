import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header.jsx';
import Footer from "../../components/Footer.jsx";
import styles from './cartPage.module.css';
import { useGetCartQuery, useUpdateCartMutation } from '../../api/cartApi';
import { updateCartItemQuantity, removeFromCart, setCart } from '../../store/cartSlice';


const baseUrl = (import.meta.env.VITE_BASE_URL ?? 'https://fakestoreapi.com/').replace(/\/+$/, '');


const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: cartData, isLoading: isCartLoading } = useGetCartQuery();
    const [updateCart] = useUpdateCartMutation();
    
    const cartItems = useSelector(state => state.cart.items);

    // local enriched cart (from API) — do not overwrite Redux automatically
    const [enrichedCart, setEnrichedCart] = useState(null);

    useEffect(() => {
        if (cartData && cartData.items) {
            (async () => {
                try {
                    const enriched = await Promise.all(cartData.items.map(async product => {
                        const res = await fetch(`${baseUrl}/products/${product.id}`);
                        const prod = await res.json();
                        return {
                            id: product.id,
                            quantity: product.quantity,
                            title: prod.title,
                            price: prod.price,
                            image: prod.image,
                        };
                    }));

                    const totalQty = enriched.reduce((s, it) => s + (it.quantity || 0), 0);
                    setEnrichedCart({ items: enriched, totalQuantity: totalQty });
                } catch (err) {
                    console.error('Failed to enrich cart from API', err);
                }
            })();
        }
    }, [cartData]);

    const displayedItems = cartItems.length > 0 ? cartItems : (enrichedCart?.items || []);

    const handleQuantityChange = async (itemId, change) => {
        if (cartItems.length > 0) {
            const item = cartItems.find(item => item.id === itemId);
            const newQuantity = Math.max(1, item.quantity + change);

            dispatch(updateCartItemQuantity({ id: itemId, quantity: newQuantity }));

            await updateCart({
                items: cartItems.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            });
        } else if (enrichedCart) {
            const newItems = enrichedCart.items.map(i => i.id === itemId ? { ...i, quantity: Math.max(1, i.quantity + change) } : i);
            setEnrichedCart(prev => ({ ...prev, items: newItems, totalQuantity: newItems.reduce((s, it) => s + it.quantity, 0) }));
            await updateCart({ items: newItems });
        }
    };

    const handleRemoveItem = async (itemId) => {
        if (cartItems.length > 0) {
            dispatch(removeFromCart(itemId));
            await updateCart({ items: cartItems.filter(item => item.id !== itemId) });
        } else if (enrichedCart) {
            const newItems = enrichedCart.items.filter(i => i.id !== itemId);
            setEnrichedCart(prev => ({ ...prev, items: newItems, totalQuantity: newItems.reduce((s, it) => s + it.quantity, 0) }));
            await updateCart({ items: newItems });
        }
    };

    const DISCOUNT = 0.2; // 20%
    const subtotal = displayedItems.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
    const discountAmount = subtotal * DISCOUNT;
    const totalAfterDiscount = subtotal - discountAmount;
    return (
        <div>
            <Header />
            <div className={styles["cart-container"]}>
                <h1 className={styles["cart-title"]}>Your Cart</h1>
                {isCartLoading ? (
                    <div className={styles["loading-state"]}>Loading cart...</div>
                ) : cartItems.length === 0 && enrichedCart ? (
                    <div className={styles["empty-cart"]}>
                        <p className={styles["empty-cart-message"]}>We found items in your online cart ({enrichedCart.totalQuantity}).</p>
                        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                            <button className={styles["checkout-btn"]} onClick={() => dispatch(setCart({ items: enrichedCart.items, totalQuantity: enrichedCart.totalQuantity }))}>Load Server Cart</button>
                            <button className={styles["continue-shopping"]} onClick={() => setEnrichedCart(null)}>Ignore</button>
                        </div>
                    </div>
                ) : displayedItems.length === 0 ? (
                    <div className={styles["empty-cart"]}>
                        <p className={styles["empty-cart-message"]}>Your cart is empty</p>
                        <button className={styles["continue-shopping"]} onClick={() => navigate('/')}>Continue Shopping</button>
                    </div>
                ) : (
                    <>
                        <div className={styles["cart-main"]}>
                            <div className={styles["cart-items"]}>
                                {displayedItems.map(item => (
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