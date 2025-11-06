import React from 'react';
import styles from '../../pages/landingPage/landingPage.module.css';

const DressStyle =()=> {
    return (
    <div className={styles["dress"]}>
        <div className={styles["browse-style-card1"]}>
            <img src="/src/assets/image/Frame 61.svg" alt=""/>
            <img src="/src/assets/image/Frame 64.svg" alt=""/>
        </div>
        <div className={styles["browse-style-card2"]}>
            <img src="/src/assets/image/Frame 63.svg" alt=""/>
            <img src="/src/assets/image/Frame 62.svg" alt=""/>
        </div>
    </div>
    );
}
export default DressStyle;