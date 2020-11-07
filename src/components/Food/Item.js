import React from 'react'
import style from './Item.module.css'
import Nutrition from './Nutrition';

function Item(props) {
    return (
        <li className={style.foodItem}>
            {props.item.checked ? <button className={style.checkbox} style={{backgroundColor: '#FF5F5F'}} onClick={() => props.click(props.index)}>&nbsp;</button> 
            : <button className={style.checkbox} style={{backgroundColor:  'white'}} onClick={() => props.click(props.index)}>&nbsp;</button>}
            
            <div className={style.resContainer}>
                <span className={style.time}>{props.item.hour}</span>
                
                <span className={style.itemName}>
                    {props.item.name}
                </span>

                <div className={style.nutrition}>
                    {props.item.type === "water" ? <h3 className={style.ml}>{props.item.ml}ml</h3>
                    : <Nutrition 
                        calories={props.item.calories}
                        fat={props.item.fat}
                        protein={props.item.protein}
                        carbon={props.item.carbon}
                    ></Nutrition>}
                </div>
            </div>
        </li>
    )
}

export default Item
