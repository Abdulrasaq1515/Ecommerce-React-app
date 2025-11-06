import React from 'react';
import Header from '../../components/Header.jsx';
import SideBar from '../../components/SideBar.jsx';
import Footer from '../../components/Footer.jsx';
import HeroSection from '../../components/HeroSection.jsx';
import AllProducts from "../../components/AllProducts.jsx";
import Styles from '../landingPage/landingPage.module.css';

const LandingPage = () => {
    return (
        <div className={Styles.landingPage}>
            <Header />
            <HeroSection/>
            <AllProducts />
            <Footer />
        </div>
    );
};
export default LandingPage;