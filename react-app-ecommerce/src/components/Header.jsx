import React from 'react';
import '../index.css'

const Header = () => {
  return (
    <div className='main-header'>
        <div className="discount-header">
            <p>Sign up and get 20% off to your first order, <a href="/src/auth/Login.jsx" className="text-blue-500">Sign Up Now</a>.</p>
        </div>
        <div className="header-content">
            <img src="/SHOP.CO.jpg" className="w-25 h-5" />
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
                <img src="/Frame 5.jpg" alt="Cart" />
            </div>
        </div>
    </div>
  );
};

export default Header;