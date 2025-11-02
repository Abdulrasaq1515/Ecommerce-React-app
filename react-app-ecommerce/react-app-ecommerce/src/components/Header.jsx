import React from 'react';
import '../index.css'
import ShopLogo from '../assets/icons/ShopLogo';
import Cart from '../assets/cart/Cart.jsx';

const Header = () => {
  return (
    <div className='main-header'>
        <div className="discount-header">
            <p>Sign up and get 20% off to your first order, <a href="/src/auth/Login.jsx" className="text-blue-500">Sign Up Now</a>.</p>
        </div>
        <div className="header-content">
            <ShopLogo/>
            <div className="nav-bar">
                <div>Shop</div>
                <div>On Sale</div>
                <div>New Arrivals</div>
                <div>Brands</div>
            </div>
            <div className="search-bar">
                <img src="/public/Frame.jpg" alt="" />
                <input type="text" placeholder="Search for products..." />
            </div>
            <div className="cart-icon">
                <Cart/>
            </div>
        </div>
    </div>
  );
};
export default Header;