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
        value: value,
        icon: highTemperatureIcon,
      };
    case "minTemp":
      return {
        title: "Temp min",
        value: value,
        icon: lowTemperatureIcon,
      };
    case "humidity":
      return {
        title: "Humidity",
        value: value,
        icon: humidityIcon,
      };
    case "chanceToRain":
      return {
        title: "Cloudy",
        value: value,
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
