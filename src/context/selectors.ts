import { TodayWeather, WeatherData } from "../features/weather/weatherTypes";
import { formatCurrentWeatherObject } from "../helpers/weatherHelper";
import { TAppStore } from "./appStore";

// ** LOCATIONS SELECTORS ** //
export const getLocationSelector = (state: TAppStore) => {
  const data = state.locationData ? Object.values(state.locationData) : null;
  return data;
};

// ** WEATHER SELECTORS ** //
export const weatherCurrentDaySelector = (
  state: TAppStore
): TodayWeather[] | null => {
  const data = weatherFiveDaysDataSelector(state);
  if (!data) return null;
  const formattedData: TodayWeather[] = [];
  Object.entries(data[0]).forEach(([key, value]) => {
    const obj = formatCurrentWeatherObject(key, value);
    if (obj !== null) {
      formattedData.push(obj);
    }
  });

  return formattedData;
};

export const currentWeatherSelector = (state: TAppStore) => {
  return state.weatherData?.current_weather;
};

export const weatherFiveDaysDataSelector = (
  state: TAppStore
): WeatherData[] | null => {
  if (!state.weatherData) return null;
  const windSpeedSufix = state.weatherData?.daily_units.windspeed_10m_max;

  const arrayWithDataFormatted: WeatherData[] = [];

  state.weatherData?.daily.time.forEach((time, i) => {
    if (i <= 5) {
      const dayObj = {};
      //@ts-expect-error TODO: type should be coming quickly
      dayObj.dayNumber = time;
      //@ts-expect-error TODO: type should be coming quickly
      arrayWithDataFormatted.push(dayObj);
    }
  });

  state.weatherData?.daily.apparent_temperature_max.forEach((max, i) => {
    if (i <= 5) {
      arrayWithDataFormatted[i].maxTemp = Math.round(max);
    }
  });

  state.weatherData?.daily.apparent_temperature_min.forEach((min, i) => {
    if (i <= 5) {
      arrayWithDataFormatted[i].minTemp = Math.round(min);
    }
  });

  state.weatherData?.daily.precipitation_probability_mean.forEach((rain, i) => {
    if (i <= 5) {
      arrayWithDataFormatted[i].chanceToRain = rain.toString() + "%";
    }
  });

  state.weatherData?.daily.windspeed_10m_max.forEach((wind, i) => {
    if (i <= 5) {
      arrayWithDataFormatted[i].wind = `${wind.toString()}${windSpeedSufix}`;
    }
  });

  state.weatherData?.daily.weathercode.forEach((code, i) => {
    if (i <= 5) {
      arrayWithDataFormatted[i].weathercode = code;
    }
  });

  state.weatherData?.daily.precipitation_probability_mean.forEach((hum, i) => {
    if (i <= 5) {
      arrayWithDataFormatted[i].humidity = hum;
    }
  });

  const returnArray = arrayWithDataFormatted.map((day, i) => {
    if (i === 0)
      return {
        ...day,
        averageTemp: state?.weatherData?.current_weather.temperature,
      };
    else {
      return {
        ...day,
        averageTemp: Math.round(((day.maxTemp + day.minTemp) / 2) * 10) / 10,
      };
    }
  });

  //@ts-expect-error TODO: type should be coming quickly
  return returnArray;
};
