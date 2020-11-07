import React from "react";
import ReactPlayer from "react-player";
import styles from "./VideoContainer.module.scss";

export default function VideoContainer() {
  return (
    <div className={styles.videoContainer}>
      <h1>How to sleep in space? </h1>
      <div className={styles.videos}>
        <div className={styles.video}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dFObkgmkxpw"
            controls
          />
        </div>
        <div className={styles.video}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=UyFYgeE32f0"
            controls
          />
        </div>
      </div>
    </div>
  );
}
