import React from 'react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import Footer from '../components/Footer.jsx';

const LandingPage = () => {
    return (
        <div>
            <Header />

            <div className='product-container'>
                <div>
                    <img src='/public/FIND CLOTHES THAT MATCHES YOUR STYLE.jpg' alt='Find Clothes That Matches Your Style' />
                </div>
                <div>
                    <img src='/public/Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style..jpg' alt='Shop Your Favorite Brands' />
                </div>
                <div className='shop-now-button'>
                    <button type='submit'className='bg-black text-white'> Shop Now</button>
                </div>
                <div className='quality-rate'>
                    <div>
                        <img src="/public/200+.jpg" alt="" />
                        <img src="/public/International Brands.jpg" alt="" />
                    </div>
                    <div>
                        <img src="/public/2,000+.jpg" alt="" />
                        <img src="/public/High-Quality Products.jpg" alt="" />
                    </div>
                    <div>
                        <img src="/public/30,000+.jpg" alt="" />
                        <img src="/public/Happy Customers.jpg" alt="" />
                    </div>
                    <div className='image-frame'>
                        <img src="/public/Rectangle 2 (1).jpg" alt="" />
                    </div>    
                </div>
                
            </div>

            <Footer />
        </div>
    );
};

export default LandingPage;