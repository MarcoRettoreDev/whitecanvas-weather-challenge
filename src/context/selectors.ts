import {
  Daily,
  TodayWeather,
  WeatherData,
} from "../features/weather/weatherTypes";
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
  const data = weatherDaysDataSelector(state, 1);
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

export const weatherDaysDataSelector = (
  state: TAppStore,
  daysQuantity: number
): WeatherData[] | null => {
  if (!state.weatherData) return null;

  const windSpeedSufix = state.weatherData?.daily_units.windspeed_10m_max;

  const arrayWithDataFormatted: WeatherData[] = [];

  if (daysQuantity === 1) {
    arrayWithDataFormatted.push({
      dayNumber: state.weatherData?.daily.time[0],
      maxTemp: Math.round(state.weatherData?.daily.apparent_temperature_max[0]),
      minTemp: Math.round(state.weatherData?.daily.apparent_temperature_min[0]),
      humidity:
        state.weatherData?.daily.precipitation_probability_mean[0]?.toString() ??
        0 + "%",
      chanceToRain:
        state.weatherData?.daily.uv_index_max[0]?.toFixed(0) ?? 0 + "%",
      wind: `${state.weatherData?.daily.windspeed_10m_max[0].toString()}${windSpeedSufix}`,
      weathercode: state.weatherData?.daily.weathercode[0],
    });

    return arrayWithDataFormatted;
  }

  // We do this to prevent index overflow
  const limitDayIndex = daysQuantity % 16;

  const slicedDailyData: Daily = {
    ...state.weatherData.daily,
  };

  for (const key in slicedDailyData) {
    if (
      Object.prototype.hasOwnProperty.call(slicedDailyData, key) &&
      Array.isArray(slicedDailyData[key])
    ) {
      slicedDailyData[key] = slicedDailyData[key]?.slice(1, limitDayIndex + 1);
    }
  }

  for (let i = 0; i < limitDayIndex; i++) {
    //@ts-expect-error we're going to fill the array in the following lines
    arrayWithDataFormatted[i] = {};
  }

  slicedDailyData.time.forEach((time, i) => {
    if (i <= limitDayIndex) {
      arrayWithDataFormatted[i].dayNumber = time;
    }
  });

  slicedDailyData.apparent_temperature_max.forEach((max, i) => {
    if (i <= limitDayIndex) {
      arrayWithDataFormatted[i].maxTemp = Math.round(max);
    }
  });

  slicedDailyData.apparent_temperature_min.forEach((min, i) => {
    if (i <= limitDayIndex) {
      arrayWithDataFormatted[i].minTemp = Math.round(min);
    }
  });

  slicedDailyData.precipitation_probability_mean.forEach((hum, i) => {
    if (i <= limitDayIndex) {
      arrayWithDataFormatted[i].humidity = hum?.toString() ?? 0 + "%";
    }
  });

  slicedDailyData.uv_index_max.forEach((uv, i) => {
    if (i <= limitDayIndex) {
      arrayWithDataFormatted[i].chanceToRain = uv?.toFixed(0) ?? 0 + "%";
    }
  });

  slicedDailyData.windspeed_10m_max.forEach((wind, i) => {
    if (i <= limitDayIndex) {
      arrayWithDataFormatted[i].wind = `${wind.toString()}${windSpeedSufix}`;
    }
  });

  slicedDailyData.weathercode.forEach((code, i) => {
    if (i <= limitDayIndex) {
      arrayWithDataFormatted[i].weathercode = code;
    }
  });

  return arrayWithDataFormatted;
};
