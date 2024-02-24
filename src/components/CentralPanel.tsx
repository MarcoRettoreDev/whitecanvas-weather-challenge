import { FC } from "react";
import { MainBadge } from "./MainBadge";
import { DetailBar } from "./DetailBar";
import { InputSearchLocation } from "./InputSearchLocation";
import { LocationSelector } from "./LocationSelector";
import { useAppStore } from "../context/appStore";
import { decodiFyWeatherCode } from "../helpers/weatherHelper";
import { ExtendedDaysSection } from "./ExtendedDaysSection";

export const CentralPanel: FC = () => {
  const weatherData = useAppStore((state) => state.weatherData);

  const weatherObj = decodiFyWeatherCode(
    weatherData?.current_weather.weathercode,
    weatherData?.current_weather.is_day
  );

  return (
    <div
      className="grid"
      style={{ backgroundImage: `url(${weatherObj.backgroundImg})` }}>
      <main className="grid__main">
        <InputSearchLocation />
        <LocationSelector />
        <MainBadge />
      </main>
      <aside className="grid__sidebar">
        <DetailBar />
        <ExtendedDaysSection />
      </aside>
    </div>
  );
};
