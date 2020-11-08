import React from 'react'
import style from './Food.module.css'
import Item from './Item'

function FoodList(props) {
    const foodHandler = (item, index) => {
        return <Item item={item} index={index} click={() => props.checkHandlerButton(index)}/>
    }

    return (
        <div className={style.foodContainer}>
            <h1 className={style.day}>Current day</h1>
            <ul className={style.foodList}>
                {props.food.map((item, index) => {
                    return foodHandler(item, index);
                })}
            </ul>
        </div>
    )
}

export default FoodList
