import { FC } from "react";

import { weatherCurrentDaySelector } from "../context/selectors";
import { useAppStore } from "../context/appStore";
import { InputSearchLocation } from "./InputSearchLocation";
import { decodiFyWeatherCode } from "../helpers/weatherHelper";
import { EmptyDataMessage } from "./EmptyDataMessage";

export const DetailBar: FC = () => {
  const data = useAppStore((state) => weatherCurrentDaySelector(state));
  const isFetchingWeather = useAppStore((state) => state.isWeatherFetching);
  const weatherData = useAppStore((state) => state.weatherData);

  const weatherObj = decodiFyWeatherCode(
    weatherData?.current_weather.weathercode,
    weatherData?.current_weather.is_day
  );

  if (isFetchingWeather) return null;

  return (
    <div className="detailbar">
      <InputSearchLocation />

      {data ? (
        <>
          <h3 className="detailbar__title">Weather Details...</h3>
          <h3 className="detailbar__subtitle">{weatherObj.weatherDetail}</h3>
          <div className="detailbar__detailstats">
            {data?.map((item) => (
              <DetailStats
                key={item.title}
                title={item.title}
                value={item.value}
                icon={item.icon}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyDataMessage />
      )}
    </div>
  );
};

interface DetailStats {
  title: string;
  value: number | string;
  icon: string | null;
}

const DetailStats: FC<DetailStats> = ({ title, value, icon }) => {
  return (
    <div className="detailbar__detailstats__item">
      <h3 className="detailbar__detailstats__item_title">{title}</h3>
      <div className="detailbar__detailstats__item__rightsection">
        <p className="detailbar__detailstats__item__rightsection_text">
          {value}
        </p>
        {icon ? (
          <div
            className="detailbar__detailstats__item__rightsection_icon"
            style={{ backgroundImage: `url(${icon})` }}></div>
        ) : null}
      </div>
    </div>
  );
};
