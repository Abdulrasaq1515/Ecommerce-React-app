import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../pages/landingPage/landingPage.module.css';
import ShopLogo from '../assets/icons/ShopLogo.jsx';
import Profile from '../assets/profile/Profile.jsx';
import Cart from '../assets/cart/Cart.jsx';const Header = () => {
  const navigate = useNavigate();
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className={styles["header-container"]}>
        <div className={styles["discount-header"]}>
            <p>Sign up and get 20% off to your first order, <a href="/login">Sign Up Now</a>.</p>
        </div>
        <div className={styles["header-content"]}>
            <ShopLogo/>
            <div className={styles["nav-bar"]}>
                <div>Shop</div>
                <div>On Sale</div>
                <div>New Arrivals</div>
                <div>Brands</div>
            </div>
            <div className={styles["search-bar"]}>
                <img src="/Frame.jpg" alt="" />
                <input type="text" placeholder="Search for products..." />
            </div>
            <div className={styles["cart-profile-container"]}>
                <div className={styles["cart-icon"]} onClick={handleCartClick}>
                    <Cart />
                    {cartQuantity > 0 && (
                        <span className={styles["cart-quantity"]}>{cartQuantity}</span>
                    )}
                </div>

                <div className={styles["profile-icon"]}>
                    <Profile />
                </div>
            </div>
        </div>
    </div>
  );
};
export default Header;