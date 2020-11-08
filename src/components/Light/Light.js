import React, {useState} from 'react'
import Switch from "react-switch";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


import modules from './Light.module.scss'

import logo from '../../assets/images/logo.svg'
import image from '../../assets/images/image.svg'
import caution from '../../assets/images/caution1.svg'

function Light() {

    const [checked, setChecked] = useState(true);
    const [beginInput, setBeginInput] = useState('23:00')
    const [endInput, setEndInput] = useState('6:00')
    const [diff, setDiff] = useState('7:00')

    const handleChecked = () => {
        setChecked(!checked)
    }

    const DaySlider = withStyles({
        root: {
          color: '#FF5151',
          height: 8,
        },
        thumb: {
          height: 30,
          width: 30,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          marginTop: -8,
          marginLeft: -12,
          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
        },
        active: {},
        valueLabel: {
          left: 'calc(-50% + 4px)',
        },
        track: {
          height: 12,
          borderRadius: 8,
        },
        rail: {
          height: 12,
          borderRadius: 8,
        },
      })(Slider);

      const NightSlider = withStyles({
        root: {
          color: '#FF5151',
          height: 8,
        },
        thumb: {
          height: 30,
          width: 30,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          marginTop: -8,
          marginLeft: -12,
          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
        },
        active: {},
        valueLabel: {
          left: 'calc(-50% + 4px)',
        },
        track: {
          height: 12,
          borderRadius: 8,
        },
        rail: {
          height: 12,
          borderRadius: 8,
        },
      })(Slider);

      const beginInputHandler = (event) => {
        const value = event.target.value
        setBeginInput(value)
        countDiff(value, endInput)
      }

      const endInputHandler = (event) => {
        const value = event.target.value
        setEndInput(value)
        countDiff(beginInput, value)
      }

      const countDiff = (begin, end) => {
          const endHour = end.split(":")
          const beginHour = begin.split(":")
          console.log(endHour)
          let resHour = 0;
          let resMin = 0;

          if (Number(endHour[0]) < Number(beginHour[0])){
              resHour = 24 - Number(beginHour[0]) - 1 + Number(endHour[0])
              resMin = 60 - Number(beginHour[1]) + Number(endHour[1])
              resHour += Math.floor(resMin/60)
              resMin %= 60
          } else {
              resHour = Number(endHour[0]) - Number(beginHour[0])
              resMin = Number(endHour[1]) - Number(beginHour[1])
              console.log(resHour, endHour, beginHour)
              if (resMin < 0) {
                resHour -= 1
                resMin += 60
              }
          }

          setDiff(`${resHour}:${resMin}`)
      }

    return (
        <div className={modules.container}>
            <div className={modules.header}>
                <img src={image} alt=""/>
                <p>Lightning assistant</p>
                <img src={logo} alt=""/>
            </div>
            <Switch onChange={handleChecked} onColor="#FF5151" className={modules.switch}/>

            <div className={modules.sliders}>
                <div>
                    <p>DAY LIGHT INTENSITY</p>
                    <DaySlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
                </div>
                <div>
                    <p>NIGHT LIGHT INTENSITY</p>
                    <NightSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
                </div>
            </div>
            <div className={modules.nightTime}>
                <p>NIGHT TIME</p>
                <div className={modules.inputs}>
                    <input type="text" value={beginInput} onChange={beginInputHandler}/>
                    <div></div>
                    <input type="text" value={endInput} onChange={endInputHandler}/>
                </div>
            </div>
            <div className={modules.duration}>
                <span>DURATION</span>
                <span>{`${diff}h`}</span>
            </div>
            <div className={modules.warning}>
                <img src={caution} alt=""/>
                <p>8-9 hours are recommended</p>
            </div>
        </div>
    )
}

export default Light
