import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  description,
  iconName,
  unitSystem,
  weatherData,
  index,
}) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <p className={styles.description}>{description}</p>
      <Image
        width="300px"
        height="300px"
        src={`/icons/0${iconName}d.svg`}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {unitSystem == "metric"
          ? Math.round(weatherData.hourly.temperature_2m[index])
          : Math.round(ctoF(weatherData.hourly.temperature_2m[index]))}
        °{unitSystem == "metric" ? "C" : "F"}
      </h1>
      <p>
        Feels like{" "}
        {unitSystem == "metric"
          ? Math.round(weatherData.hourly.apparent_temperature[index])
          : Math.round(ctoF(weatherData.hourly.apparent_temperature[index]))}
        °{unitSystem == "metric" ? "C" : "F"}
      </p>
    </div>
  );
};
