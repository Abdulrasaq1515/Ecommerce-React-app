import React from "react";
import Vector from "../assets/vector/Vector.jsx";
import styles from '../pages/landingPage/landingPage.module.css';


const HeroSection = () => {
  return (
      <div>
        <div className={styles["hero-section"]}>
        <div className={styles["section-one"]}>
          <div className={styles["hero-text"]}>
            <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
          </div>
          <div className={styles["hero-description"]}>
            <p>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style
            </p>
          </div>
            {/*<div className= "vector">*/}
            {/*    <Vector />*/}
            {/*</div>*/}
          <div className={styles["hero-button"]}>
            <button type="submit" className="bg-black text-white">
              {" "}
              Shop Now
            </button>
          </div>
          <div className={styles["hero-numbers-container"]}>
            <div>
              <p>200+</p>
              <h6>International Brands</h6>
            </div>
            <div>
              <p>2,000+</p>
              <h6>High-Quality Products</h6>
            </div>
            <div>
              <p>30,000+</p>
              <h6>Happy Customers</h6>
            </div>
          </div>
        </div>
      <div className={styles["section-two"]}>
        <img src="/src/assets/image/Rectangle_2__1_-removebg-preview.png" alt="" />
      </div>
      <div>
        <Vector />
      </div>
    </div>
    <div className={styles.brands}>
        <p>VERSACE</p>
        <p>ZARA</p>
        <p>GUCCI</p>
        <p>PRADA</p>
        <p>CALVIN KLEIN</p>
    </div>
    </div>
    
  )
};
export default HeroSection;
