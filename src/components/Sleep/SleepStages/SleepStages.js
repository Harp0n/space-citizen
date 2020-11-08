import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import styles from "./SleepStages.module.scss";
import "react-circular-progressbar/dist/styles.css";

const SleepStages = (props) => {
  const convertTime = (minutes) => {
    const hours = parseInt(minutes / 60);
    const mins = minutes - hours * 60;

    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.progressBar}>
        <CircularProgressbar
          value={props.minutes}
          minValue={0}
          maxValue={props.sleepTime}
          text={convertTime(props.minutes)}
          styles={buildStyles({
            textColor: "white",
            pathColor: "white",
            trailColor: "#CAC7C7",
          })}
        />
      </div>
    </div>
  );
};

export default SleepStages;
