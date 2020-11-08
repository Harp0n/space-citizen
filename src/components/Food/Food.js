import React, { useState, useEffect } from 'react'
import FoodChart from './FoodChart';
import style from './Food.module.css';
import Item from './Item';
import FoodList from './FoodList';
import PersonInfo from './PersonInfo';
import {getDailyMenu, getRequiredNutrition} from "../../algorithms/foodPlanner/FoodPlanner";

function Food() {
    const [value, setvalue] = useState(new Date());
    const [food, setFood] = useState([]);
    const [person, setPerson] = useState(
        {
            weight: 80,
            height: 180,
            gender: 'male',
            age: 21
        });
    const [modalVisible, setModalVisible] = useState(true);
    const [reqNutrition, setReqNutrition] = useState([]);

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


    const submitHandler = async (event) => {
        event.preventDefault();
        setModalVisible(false)

        const reqNut =  getRequiredNutrition(person);
        const dailyMenu = await getDailyMenu(person);

        console.log(reqNut);
        console.log(dailyMenu);

        const foodList = [];

        dailyMenu.forEach(element => {
            if(element[1].name != "Water")
            {
                foodList.push(
                    {
                        type: "food",
                        hour: `${addZero(element[0].hours)}:${addZero(element[0].minutes)}`,
                        name: element[1].name,
                        calories: element[1].nutritions.calories,
                        protein: element[1].nutritions.proteins,
                        carbon: element[1].nutritions.carbs,
                        fat: element[1].nutritions.fats,
                        checked: false
                    }
                )
            }
            else {
                foodList.push(
                    {
                        type: "water",
                        name: "water",
                        hour: `${addZero(element[0].hours)}:${addZero(element[0].minutes)}`,
                        ml: element[1].nutritions.fluid,
                        checked: false
                    }
                )
            }
        });

        setFood(foodList);

        const chartData = [
            {
                type: 'calories',
                value: reqNut.calories,
                mode: 'goal',
                color: '#FF5F5F'
            },
            {
                type: 'water',
                value:  reqNut.fluid ,
                mode: 'goal',
                color: '#A0B4FF'
            },
            {
                type: 'fat',
                value: reqNut.fats,
                mode: 'goal',
                color: '#FDFF90'
            },
            {
                type: 'protein',
                value: reqNut.proteins,
                mode: 'goal',
                color: '#695959'
            },
            {
                type: 'carbs',
                value:  reqNut.carbs,
                mode: 'goal',
                color: '#D3D3D3'
            }
        ];

        setReqNutrition(chartData);
    }

    const handleGenderChange = (event) => {
        console.log(event);

        const personClone = {...person};

        if(event.target.id === "man") {
            personClone.gender = "male";
        }
        else if(event.target.id === "woman") {
            personClone.gender = "female";
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

        return [
            {
                type: 'calories',
                value: calories,
                color: '#FF5F5F',
                mode: 'current'
            },
            {
                type: 'water',
                value: water,
                color: '#A0B4FF',
                mode: 'current'
            },
            {
                type: 'fat',
                value: fat,
                color: '#FDFF90',
                mode: 'current'
            },
            {
                type: 'protein',
                value: protein,
                color: '#695959',
                mode: 'current'
            },
            {
                type: 'carbs',
                value: carbon,
                color: '#D3D3D3',
                mode: 'current'
            }
        ];
    }

    const checkHandlerButton = (index) => {
        const foodListCopy = [...food];

        foodListCopy[index].checked = !foodListCopy[index].checked;

        setFood(foodListCopy);
        calculateFoodResources();
    }

    const foodRes = calculateFoodResources();

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
                <FoodChart data={[...foodRes, ...reqNutrition]} />
            </div>

            <FoodList food={food} checkHandlerButton={checkHandlerButton}/>
        </section>
        </>
    )
}


export default Food
