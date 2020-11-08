import { Label } from 'bizcharts'
import React from 'react'
import { useState } from 'react/cjs/react.development'
import classes from './PersonInfo.module.css'
import style from './PersonInfo.module.css'

function PersonInfo(props) {
    return (
        <div className={style.PersonInfo} onSubmit={props.submit}>
            <form className={style.PersonInfoForm}>
                <div>
                    <label id="age">Age </label>
                    <input onChange={props.handleAgeChange} className={style.styledInput} htmlFor="age" type="number" min="0" max="140" placeholder="age" defaultValue="18" required/> years
                </div>

                <div>
                    <label id="heigth">Height </label>
                    <input onChange={props.handleHeightChange} className={style.styledInput} htmlFor="height" type="number" min="100" max="250" placeholder="height"  defaultValue="175" required/> cm
                </div>

                <div>
                    <label id="weight">Weight </label>
                    <input onChange={props.handleWeightChange} className={style.styledInput} htmlFor="weight" type="number" min="30" max="200" placeholder="weight" defaultValue="80" required/> kg
                </div>

                <div className={style.genderOption}>
                    <label id="gender">Gender</label>
                    <input onChange={props.handleGenderChange} type="radio" name="gender" id="man" />
                    <label htmlFor="man">M</label>
                    <input type="radio" name="gender" id="woman" />
                    <label onChange={props.handleGenderChange} htmlFor="woman">W</label>
                </div>

                <div className={style.submitOptions}>
                    <input className={style.styledInputButton} type="reset" value="Reset" />
                    <input className={style.styledInputButton} type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default PersonInfo
