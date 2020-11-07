import React, { useState } from "react";
import styles from "./Sleep.module.scss";
import trackImage from "../../assets/track.svg";
import { Chart, Line, Point, Tooltip, Axis, Legend } from "bizcharts";
import SleepStages from "./SleepStages/SleepStages";
import VideoContainer from "./VideoContainer/VideoContainer";
import { Link } from "react-router-dom";

function Sleep() {
  const dataWeek = [
    {
        day: "24.11",
        time: 7.5,
      },
    {
        day: "25.11",
        time: 8.5,
      },
      {
        day: "26.11",
        time: 6,
      },
      {
        day: "27.11",
        time: 7,
      },
      {
        day: "28.11",
        time: 10,
      },
      {
        day: "29.11",
        time: 8,
      },
      {
        day: "30.11",
        time: 8,
      },
  ];

  const dataMonth = [
    {
      day: "1.11",
      time: 5,
    },
    {
      day: "2.11",
      time: 5,
    },
    {
      day: "3.11",
      time: 6,
    },
    {
      day: "4.11",
      time: 7.5,
    },
    {
      day: "5.11",
      time: 8.5,
    },
    {
      day: "6.11",
      time: 6,
    },
    {
      day: "7.11",
      time: 7,
    },
    {
      day: "8.11",
      time: 10,
    },
    {
      day: "9.11",
      time: 8,
    },
    {
      day: "10.11",
      time: 8,
    },
    {
      day: "11.11",
      time: 5,
    },
    {
      day: "12.11",
      time: 5,
    },
    {
      day: "13.11",
      time: 6,
    },
    {
      day: "14.11",
      time: 7.5,
    },
    {
      day: "15.11",
      time: 8.5,
    },
    {
      day: "16.11",
      time: 6,
    },
    {
      day: "17.11",
      time: 7,
    },
    {
      day: "18.11",
      time: 10,
    },
    {
      day: "19.11",
      time: 8,
    },
    {
      day: "20.11",
      time: 8,
    },
    {
      day: "21.11",
      time: 5,
    },
    {
      day: "22.11",
      time: 5,
    },
    {
      day: "23.11",
      time: 6,
    },
    {
      day: "24.11",
      time: 7.5,
    },
    {
      day: "25.11",
      time: 8.5,
    },
    {
      day: "26.11",
      time: 6,
    },
    {
      day: "27.11",
      time: 7,
    },
    {
      day: "28.11",
      time: 10,
    },
    {
      day: "29.11",
      time: 8,
    },
    {
      day: "30.11",
      time: 8,
    },
  ];
  const dataDays = [
    {
        day: "20.11",
        time: 8,
      },
      {
        day: "21.11",
        time: 5,
      },
      {
        day: "22.11",
        time: 5,
      },
      {
        day: "23.11",
        time: 6,
      },
      {
        day: "24.11",
        time: 7.5,
      },
      {
        day: "25.11",
        time: 8.5,
      },
      {
        day: "26.11",
        time: 6,
      },
      {
        day: "27.11",
        time: 7,
      },
      {
        day: "28.11",
        time: 10,
      },
      {
        day: "29.11",
        time: 8,
      },
      {
        day: "30.11",
        time: 8,
      },
  ];
  const cols = {
    time: {
      min: 4,
      max: 12,
    },
  };
  const shedule = [
    { day: "Monday", from: "23:00", to: "7:00" },
    { day: "Tuesday", from: "22:00", to: "7:00" },
    { day: "Wednesday", from: "23:00", to: "7:00" },
    { day: "Thursday", from: "23:30", to: "8:30" },
    { day: "Friday", from: "02:00", to: "10:00" },
    { day: "Saturday", from: "00:00", to: "8:00" },
    { day: "Sunday", from: "22:00", to: "7:00" },
  ];
  const sleepStageDataInitial = [
    { title: "Awake", minutes: 23 },
    { title: "REM", minutes: 95 },
    { title: "Light", minutes: 233 },
    { title: "Deep", minutes: 86 },
  ];
  const [data, setData] = useState([...dataWeek]);
  const [sleepStageData, setSleepStageData] = useState(sleepStageDataInitial);
  const [currDay, setCurrDay] = useState(["TODAY", "Tonight"]);
  const [currDataType, setCurrDataType] = useState(0); 
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomSleepStageData = () => {
    const awake = getRandomIntInclusive(10, 40);
    const rem = getRandomIntInclusive(90, 180);
    const light = getRandomIntInclusive(120, 160);
    const deep = getRandomIntInclusive(70, 120);
    return [
      { title: "Awake", minutes: awake },
      { title: "REM", minutes: rem },
      { title: "Light", minutes: light },
      { title: "Deep", minutes: deep },
    ];
  };
  const getQualityOfSleep = (minutes) => {
    if (minutes >= 60 * 8) return "very good";
    if (minutes >= 60 * 7) return "good";
    if (minutes >= 60 * 6) return "quite bad";
    return "very bad";
  };

  const getQualityPercentage = (minutes) => {
    if (minutes >= 60 * 8) return getRandomIntInclusive(81, 100);
    if (minutes >= 60 * 7) return getRandomIntInclusive(61, 80);
    if (minutes >= 60 * 6) return getRandomIntInclusive(41, 60);
    return getRandomIntInclusive(10, 40);
  };

  const getSleepStageDataTime = () => {
    return sleepStageData.reduce(
      (prevVal, curVal) => prevVal + curVal.minutes,
      0
    );
  };

  const getTimeSlept = (minutes) => {
    const hours = parseInt(minutes / 60);
    const mins = minutes - hours * 60;
    return `${hours}H ${mins}M`;
  };

  const getDay = (day) => {
    console.log(currDay);
    if (day === data[data.length - 1].day) {
      setCurrDay(["TODAY", "Tonight"]);
    } else setCurrDay([`ON ${day}`, `On ${day}`]);
  };

  const sleepStageDataTime = getSleepStageDataTime();

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <h1>Stages of sleep</h1>
        {sleepStageData.map((d) => (
          <SleepStages
            key={d.title}
            minutes={d.minutes}
            sleepTime={sleepStageDataTime}
            title={d.title}
          />
        ))}
        <Link to="/light"><button className={[styles.button, styles.whiteBtn].join(' ')}>Light assistant</button></Link>
      </nav>
      <div className={styles.titleDiv}>
        <h1>Sleep</h1>
      </div>
      <div className={styles.sleepQualityContainer}>
        <h1>
          YOU SLEPT <p>{getTimeSlept(sleepStageDataTime)}</p> {currDay[0]}! KEEP
          IT GOING.
        </h1>
        <div className={styles.overalStatusContainer}>
          <div className={styles.trackContainer}>
            <img
              src={trackImage}
              className={styles.sleepQualityImage}
              alt="Track"
            />
            <h2>{`${getQualityPercentage(sleepStageDataTime)}%`}</h2>
          </div>
          <div className={styles.trackText}>
            <p className={styles.trackTextInfo}>
              Your overall sleep quality indicates how good was your sleep at
              night comparing to other days.
            </p>
            <p className={styles.trackTextInfoQuality}>
              {currDay[1]} your quality of sleep was{" "}
              <span>{getQualityOfSleep(sleepStageDataTime)}</span>.{" "} <br/>
              <p className={styles.trackTextInfo}>

              Below you can see history of your sleep. 
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <Chart
          title={{
            position: "left",
            style: {
              fontSize: 20,
              fill: "white",
            },
            color: "white",
          }}
          padding={[10, 20, 50, 50]}
          autoFit
          height={500}
          data={data}
          scale={cols}
          onPointClick={(evt) => {
            getDay(evt.data.data.day);
            setSleepStageData(randomSleepStageData());
          }} //add ability to get stages of sleep of every day
        >
          <Legend visible={true} />

          <Line
            position="day*time"
            style={{
              stroke: "#CD4A4A",
            }}
          />
          <Point
            position="day*time"
            label="day"
            size={10}
            animate={true}
            color="white"
          />
          <Tooltip
            showCrosshairs
            triggerOn="hover"
            crosshairs={{
              type: "y",
            }}
          />
          <Axis
            name="time"
            label={{ formatter: (val) => `${val}H` }}
            title={{
              position: "left",
              style: {
                fontSize: 20,
                fill: "white",
              },
              color: "white",
            }}
          />
        </Chart>
        <p className={styles.chartTip}>
          If you want to check your data from another day, simply click on its{" "}
          <span>Point</span> in the chart.
        </p>

        <div className={styles.buttonsContainer}>
          <button
            className={[styles.button, styles.weekBtn, currDataType === 0? styles.active : null ].join(" ")}
            onClick={() => {
              if(currDataType === 0) return; 
              setData([...dataWeek]);
              setCurrDataType(0); 
            }}
          >
            Week
          </button>
          <button
            className={[styles.button, styles.monthBtn, currDataType === 1? styles.active : null ].join(" ")}
            onClick={() => {
              if(currDataType === 1) return; 
              setData([...dataMonth]);
              setCurrDataType(1); 

            }}
          >
            Month
          </button>
          <button
            className={[styles.button, styles.daysBtn, currDataType === 2? styles.active : null ].join(" ")}
            onClick={() => {
              if(currDataType === 2) return; 
              setData([...dataDays]);
              setCurrDataType(2); 

            }}
          >
            10 days
          </button>
        </div>
      </div>
      <div className={styles.sleepSheduleContainer}>
        <h1>YOUR SLEEP SHEDULE FOR THIS WEEK: </h1>
        {shedule.map((s) => {
          return (
            <div className={styles.sheduleDay}>
              <h1 className={styles.sheduleDayName}>{s.day}</h1>
              <h2 className={styles.sheduleDayTime}>
                {s.from} - {s.to}
              </h2>
            </div>
          );
        })}
      </div>
      <VideoContainer/>
    </div>
  );
}

export default Sleep;
