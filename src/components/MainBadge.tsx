import { FC } from "react";
import { useAppStore } from "../context/appStore";
import { currentWeatherSelector } from "../context/selectors";
import { format } from "date-fns";
import { LoadingSpinner } from "./LoadingSpinner";
import { decodiFyWeatherCode } from "../helpers/weatherHelper";

export const MainBadge: FC = () => {
  const selectedLocation = useAppStore((state) => state.selectedLocation);
  const currentWeather = useAppStore((state) => currentWeatherSelector(state));
  const weatherData = useAppStore((state) => state.weatherData);

  const isWeatherFetching = useAppStore((state) => state.isWeatherFetching);
  const weatherObj = decodiFyWeatherCode(
    weatherData?.current_weather.weathercode,
    weatherData?.current_weather.is_day
  );

  const dateFormatted = currentWeather?.time
    ? format(new Date(currentWeather?.time), "k:mm - EEEE, d LLL ‘yy")
    : null;

  return (
    <div className="mainbadge">
      {isWeatherFetching ? (
        <LoadingSpinner />
      ) : weatherData ? (
        <>
          <div className="mainbadge__degree">
            <h1 className="mainbadge__degree_text">
              {currentWeather?.temperature.toFixed(0)}°
            </h1>
          </div>
          <div className="mainbadge__textwrapper">
            <h2 className="mainbadge__textwrapper_city">
              {selectedLocation?.name}
            </h2>
            <h4 className="mainbadge__textwrapper_datetime">{dateFormatted}</h4>
          </div>
          <img className="mainbadge__icon" src={weatherObj.icon}></img>
        </>
      ) : null}
    </div>
  );
};
