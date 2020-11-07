import React from 'react'
import {
    Link
} from "react-router-dom";
import classes from "./Menu.module.css";

function Menu() {
    return (
        <section className={classes.menu}>
            <h1>MANAGMENT</h1>
            <div className={classes.menuContainerManagment}>                
                <Link to="/sleep">Sleep</Link>
                <Link to="/light">Light</Link>
                <Link to="/fitness">Fitness</Link>
                <Link to="/health">Health</Link>
                <Link to="/food">Food</Link>
            </div>

            <h2>HOW TO</h2>
            <div className={classes.menuContainerTool}>
                <Link>Tutorial</Link>
                <Link>Knowleadge</Link>
            </div>
        </section>
    )
}

export default Menu
