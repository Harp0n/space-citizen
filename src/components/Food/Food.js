import React, { useState, useEffect } from 'react'
import FoodChart from './FoodChart';
import style from './Food.module.css';
import Item from './Item';
import FoodList from './FoodList';
import PersonInfo from './PersonInfo';
import {getDailyMenu, getRequiredNutrition} from "../../algorithms/foodPlanner/FoodPlanner";

function Food() {
    const [value, setvalue] = useState(new Date());
    const [food, setFood] = useState(foodList);
    const [person, setPerson] = useState(
        {
            weight: 80,
            height: 180,
            gender: 'man',
            age: 21
        });
    const [modalVisible, setModalVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(
            () => setvalue(new Date()),
            1000
        );

        return () => {
            clearInterval(interval);
        }
    }, []);

    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }


    const submitHandler = (event) => {
        event.preventDefault();
        setModalVisible(false)
        console.log(getDailyMenu(person));
        console.log(getRequiredNutrition(person));
    }

    const handleGenderChange = (event) => {
        console.log(event);

        const personClone = {...person};

        if(event.target.id === "man") {
            personClone.gender = "man";
        }
        else if(event.target.id === "woman") {
            personClone.gender = "woman";
        }
        
        setPerson(personClone);
    }

    const handleWeightChange= (event) => {
        console.log("Weight changed");

        const personClone = {...person};

        personClone.weight = event.target.value;

        setPerson(personClone);
    }

    const handleHeightChange = (event) => {
        console.log("Weight changed");

        const personClone = {...person};

        personClone.height = event.target.value;

        setPerson(personClone);
    }
    const handleAgeChange = (event) => {
        console.log("Age changed");

        const personClone = {...person};

        personClone.age = event.target.value;

        setPerson(personClone);
    }

    const calculateFoodResources = () => {
        let calories = 0;
        let fat = 0;
        let protein = 0;
        let water = 0;
        let carbon = 0;

        food.forEach(item => {
            if(item.checked)
            {
                if (item.type === 'water') {
                    water += parseInt(item.ml);
                }
                else if (item.type === 'food') {
                    calories += parseInt(item.calories);
                    fat += parseInt(item.fat);
                    protein += parseInt(item.protein);
                    carbon += parseInt(item.carbon);
                }
            }
        });

        let sum = calories + water + fat + protein + carbon;
        if (sum === 0) {
            sum = 1;
        }

        return [
            {
                type: 'calories',
                value: calories,
                percent: calories / sum,
                color: '#FF5F5F'
            },
            {
                type: 'water',
                value: water,
                percent: water / sum,
                color: '#A0B4FF'
            },
            {
                type: 'fat',
                value: fat,
                percent: fat / sum,
                color: '#FDFF90'
            },
            {
                type: 'protein',
                value: protein,
                percent: protein / sum,
                color: '#695959'
            },
            {
                type: 'carbon',
                value: carbon,
                percent: carbon / sum,
                color: '#D3D3D3'
            }
        ];
    }

    const checkHandlerButton = (index) => {
        const foodListCopy = [...foodList];

        foodListCopy[index].checked = !foodListCopy[index].checked;

        setFood(foodListCopy);
        calculateFoodResources();
    }

    const foodRes = calculateFoodResources();

    const cols = {
        percent: {
            formatter: val => {
                val = val * 100 + '%';
                return val;
            },
        },
    };

    return (
        <>
        {modalVisible && <PersonInfo 
            handleHeightChange={handleHeightChange}
            handleWeightChange={handleWeightChange}
            handleGenderChange={handleGenderChange}
            handleAgeChange={handleAgeChange}
            submit={submitHandler}
        />}
        <section className={style.sectionFood}>
            <div className={style.resourceContainer}>
                <h3 className={style.currentHour}>Current hour <span className={style.hour}>{value.getHours()}:{addZero(value.getMinutes())}</span></h3>
                <div className={style.list}>
                    {foodRes.map((item, index) => {
                        return <div className={style.resource} key={index}>
                            <h5 className={style.itemType}>{item.type} </h5>
                            <h6 className={style.resValue} style={{ backgroundColor: `${item.color}` }}>{item.value}</h6>
                        </div>
                    })}
                </div>
                <FoodChart col={cols} data={foodRes} />
            </div>

            <FoodList food={food} checkHandlerButton={checkHandlerButton}/>
        </section>
        </>
    )
}

const foodList = [
    {
        type: "food",
        hour: "12:30",
        name: "Racja 741",
        calories: "210",
        protein: "20",
        carbon: "30",
        fat: "12",
        checked: true
    },
    {
        type: "water",
        name: "water",
        hour: "13:40",
        ml: 500,
        checked: true
    },
    {
        type: "food",
        hour: "14:00",
        name: "Racja 741",
        calories: "210",
        protein: "20",
        carbon: "30",
        fat: "12",
        checked: true
    },
    {
        type: "water",
        name: "water",
        hour: "16:00",
        ml: 500,
        checked: false
    },
    {
        type: "food",
        hour: "16:00",
        name: "Racja 741",
        calories: "210",
        protein: "20",
        carbon: "30",
        fat: "12",
        checked: false
    },
    {
        type: "water",
        name: "water",
        hour: "17:00",
        ml: 500,
        checked: false
    },
    {
        type: "water",
        name: "water",
        hour: "17:40",
        ml: 500,
        checked: false
    },
    {
        type: "water",
        name: "water",
        hour: "18:00",
        ml: 500,
        checked: false
    },
    {
        type: "food",
        hour: "19:00",
        name: "Racja 741",
        calories: "210",
        protein: "20",
        carbon: "30",
        fat: "12",
        checked: false
    },
    {
        type: "food",
        hour: "22:00",
        name: "Racja 571",
        calories: "210",
        protein: "20",
        carbon: "30",
        fat: "12",
        checked: false
    }
]


export default Food
