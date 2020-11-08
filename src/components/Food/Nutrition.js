import React from 'react'
import style from './Nutrition.module.css'

function Nutrition(props) {
    return (
        <>
            <span className={style.calories}>calories <br/> {props.calories}</span>
            <span className={style.carbon}>carbs <br/> {props.carbon}</span>
            <span className={style.fat}>fat <br/> {props.fat}</span>
            <span className={style.protein}>protein <br/> {props.protein}</span>
        </>
    )
}

export default Nutrition
