import { FC } from "react";
import fakeIcon from "../assets/svg/cloudy.svg";
import { useAppStore } from "../context/appStore";
import { currentWeatherSelector } from "../context/selectors";
import { format } from "date-fns";
import { LoadingSpinner } from "./LoadingSpinner";

export const MainBadge: FC = () => {
  const selectedLocation = useAppStore((state) => state.selectedLocation);
  const currentWeather = useAppStore((state) => currentWeatherSelector(state));
  const isWeatherFetching = useAppStore((state) => state.isWeatherFetching);

  const dateFormatted = currentWeather?.time
    ? format(new Date(currentWeather?.time), "k:mm - EEEE, d LLL ‘yy")
    : null;

  return (
    <div className="mainbadge">
      {isWeatherFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="mainbadge__degree">
            {currentWeather?.temperature.toFixed(0)}°
          </h1>
          <div className="mainbadge__textwrapper">
            <h2 className="mainbadge__textwrapper_city">
              {selectedLocation?.name}
            </h2>
            <h4 className="mainbadge__textwrapper_datetime">{dateFormatted}</h4>
          </div>
          <img className="mainbadge__icon" src={fakeIcon}></img>
        </>
      )}
    </div>
  );
};
