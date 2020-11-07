import React from 'react'
import {
    Link
} from "react-router-dom";
import Image from '../assets/main.svg';
import Logo from '../assets/logo.svg';
import Rockets from '../assets/rockets.svg';
import styles from "./Menu.module.scss";

function Menu() {
    return (
        <React.Fragment>
        <div className={styles.mainImage}>
            <img src={Image} alt="spaceman" />
        </div>
        <div className={styles.logo}>
            <img src={Logo} alt="spaceman" />
        </div>
        <div className={styles.rocketsImage}>
            <img src={Rockets} alt="spaceman" />
        </div>
        <section className={styles.menu}>
            <h1 className={styles.header}>MANAGMENT</h1>
            <div className={styles.menuContainerManagment}>                
                <Link to="/sleep"><button className={styles.button}>Sleep</button></Link>
                <Link to="/light"><button className={styles.button}>Light</button></Link>
                <Link to="/food"><button className={styles.button}>Food</button></Link>
                <Link to="/health"><button className={styles.button}>Health</button></Link>
            </div>

            <h1 className={styles.header}>HOW TO</h1>
            <div className={styles.menuContainerTool}>
            <div className={[styles.menuContainerManagment, styles.menuContainerTool].join(' ')}>                
                <Link to="/sleep"><button className={styles.button}>Tutorials</button></Link>
                <Link to="/light"><button className={styles.button}>Knowledge</button></Link>

            </div>
            </div>
        </section>
        </React.Fragment>

    )
}

export default Menu
