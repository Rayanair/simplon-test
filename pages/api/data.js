export default async function handler(req, res) {
  const { config } = req.body
  const getWeatherData = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${config.latitude}&longitude=${config.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_speed_20m,wind_direction_10m,wind_direction_20m,temperature_20m,temperature_50m,temperature_100m,temperature_150m,temperature_200m&daily=sunrise,sunset,uv_index_clear_sky_max&timeformat=unixtime&timezone=auto&forecast_days=1&models=meteofrance_seamless`);
  const data = await getWeatherData.json();
  res.status(200).json(data);
}
