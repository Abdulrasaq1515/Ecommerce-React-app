import React from 'react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import Footer from '../components/Footer.jsx';
import HeroSection from '../components/HeroSection.jsx';
import AllProducts from "../components/AllProducts.jsx";

const LandingPage = () => {
    return (
        <div>
            <Header />
            <HeroSection/>
            <AllProducts />
            <Footer />
        </div>
    );
};
export default LandingPage;