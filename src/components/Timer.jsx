import styles from "./Timer.module.css";
import { useEffect } from "react";

export default function Timer({ time, setTime }) {
  // esling-disable-next-line

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time, setTime]);

  return (
    <div className={styles.timer}>{
      // time in 00:00 format
      `${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`
    }</div>
  );
}
