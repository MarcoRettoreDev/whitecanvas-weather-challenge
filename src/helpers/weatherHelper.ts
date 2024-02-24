import highTemperatureIcon from "../assets/svg/temperature-high.svg";
import lowTemperatureIcon from "../assets/svg/temperature-low.svg";
import humidityIcon from "../assets/svg/humidity.svg";
import cloudIcon from "../assets/svg/cloudy.svg";
import windIcon from "../assets/svg/wind.svg";

export const formatCurrentWeatherObject = (
  key: string,
  value: string | number
) => {
  switch (key) {
    case "maxTemp":
      return {
        title: "Temp max",
        value: `${value}°`,
        icon: highTemperatureIcon,
      };
    case "minTemp":
      return {
        title: "Temp min",
        value: `${value}°`,
        icon: lowTemperatureIcon,
      };
    case "humidity":
      return {
        title: "Humidity",
        value: `${value}%`,
        icon: humidityIcon,
      };
    case "chanceToRain":
      return {
        title: "Cloudy",
        value: `${value}%`,
        icon: cloudIcon,
      };
    case "wind":
      return {
        title: "Wind",
        value: value,
        icon: windIcon,
      };
    default:
      return null;
  }
};

import snowWeatherIcon from "../assets/svg/Snow.svg";
import snowWeatherBackground from "../assets/images/snow.png";

import cloudyIcon from "../assets/svg/Broken-Cloudy.svg";
import cloudyDayBackground from "../assets/images/cloudy_day.png";
import cloudyNightBackground from "../assets/images/cloudy_night.png";

import mistIcon from "../assets/svg/mist.svg";
import mistBackground from "../assets/images/mist.png";

import thunderstormIcon from "../assets/svg/Thunderstorm.svg";
import thunderstromBackground from "../assets/images/thunderstrom.png";

import rainIcon from "../assets/svg/Shower-Rain&Sun.svg";
import rainBackground from "../assets/images/rain.png";

import clearDayIcon from "../assets/svg/Sunny.svg";
import clearNightIcon from "../assets/svg/moon.svg";
import clearDayBackground from "../assets/images/clear.png";
import clearNightBackground from "../assets/images/night.png";

type returnObj = {
  backgroundImg: string;
  icon: string;
  weatherDetail: string;
};

export const decodiFyWeatherCode = (
  code: number | undefined,
  is_day: number | undefined
): returnObj => {
  // is_day= 0 false, 1 true
  const baseObj: returnObj = {
    backgroundImg: "",
    icon: "",
    weatherDetail: "",
  };

  switch (code) {
    // sunny - clear
    case 0:
    case 1: {
      baseObj.weatherDetail = "Clear sky";
      baseObj.icon = is_day === 1 ? clearDayIcon : clearNightIcon;
      baseObj.backgroundImg =
        is_day === 1 ? clearDayBackground : clearNightBackground;
      break;
    }
    // cloudy
    case 2:
    case 3: {
      baseObj.weatherDetail = "Partly cloudy";
      baseObj.icon = cloudyIcon;
      baseObj.backgroundImg =
        is_day === 1 ? cloudyDayBackground : cloudyNightBackground;
      break;
    }
    // mist-fog
    case 45:
    case 48: {
      baseObj.weatherDetail = "Fog and depositing rime fog";
      baseObj.icon = mistIcon;
      baseObj.backgroundImg = mistBackground;
      break;
    }
    //snow
    case 51:
    case 53:
    case 55:
    case 56:
    case 57: {
      baseObj.weatherDetail = "Drizzle";
      baseObj.icon = snowWeatherIcon;
      baseObj.backgroundImg = snowWeatherBackground;
      break;
    }
    case 66:
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86: {
      baseObj.weatherDetail = "Snow fall and snow showers";
      baseObj.icon = snowWeatherIcon;
      baseObj.backgroundImg = snowWeatherBackground;
      break;
    }
    // rain
    case 61:
    case 63:
    case 65:
    case 67:
    case 80:
    case 81:
    case 82: {
      baseObj.weatherDetail = "Rain and rain showers";
      baseObj.icon = rainIcon;
      baseObj.backgroundImg = rainBackground;
      break;
    }
    case 95:
    case 96:
    case 99: {
      baseObj.weatherDetail = "Thunderstorm";
      baseObj.icon = thunderstormIcon;
      baseObj.backgroundImg = thunderstromBackground;
      break;
    }

    default: {
      baseObj.backgroundImg =
        is_day === 1 ? clearDayBackground : clearNightBackground;
      baseObj.icon = is_day === 1 ? clearDayIcon : clearNightIcon;
      break;
    }
  }

  return baseObj;
};
