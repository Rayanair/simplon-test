import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem, index, currentTime}) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData, index)}, ${getTime(
          unitSystem,
          currentTime,
          weatherData.utc_offset_seconds
         
        )} ${getAMPM(unitSystem,
        currentTime,
        weatherData.utc_offset_seconds
         )}`}
      </h2>
    </div>
  );
};
