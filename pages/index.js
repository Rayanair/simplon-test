import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";


import styles from "../styles/Home.module.css";
import config from "../config.json";

export const App = () => {
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");
  const [heurIndex, setHeurIndex] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const date = new Date(); 
  
  const heuractuel = () => {
    return date.getHours(); 
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = Math.floor(Date.now() / 1000); 
      setCurrentTime(newTime);
    },15 * 1000); 
    return () => clearInterval(intervalId);
  }, []); 


  useEffect(() => {
    setCurrentTime(Math.floor(Date.now() / 1000));
    setHeurIndex(heuractuel());

    const intervalId = setInterval(() => {
      setTriggerFetch(prev => !prev);  
    }, 60 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      const data = await res.json();
      setWeatherData({ ...data });
    };
    if (triggerFetch) {
      getData();
    }
  }, [triggerFetch]);

  const changeSystem = () =>
    unitSystem === "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

      

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={config.name}
        country={config.country}
        description={config.description}
        iconName={weatherData.hourly.weather_code[heurIndex]}
        unitSystem={unitSystem}
        weatherData={weatherData}
        index={heurIndex} 
      />
      <ContentBox>
        <Header>
        <DateAndTime weatherData={weatherData} unitSystem={unitSystem} index={heurIndex} currentTime={currentTime} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} index={heurIndex} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;