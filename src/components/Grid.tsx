import { FC, useEffect } from "react";
import { MainBadge } from "./MainBadge";
import { DetailBar } from "./DetailBar";
import { InputSearchLocation } from "./InputSearchLocation";
import { LocationSelector } from "./LocationSelector";
import { useAppStore } from "../context/appStore";
import { decodiFyWeatherCode } from "../helpers/weatherHelper";
import { ExtendedDaysSection } from "./ExtendedDaysSection";
import { useAnimate, usePresence } from "framer-motion";
import { DisplayFetchError } from "./DisplayFetchError";

export const Grid: FC = () => {
  const weatherData = useAppStore((state) => state.weatherData);
  const isWeatherFetching = useAppStore((state) => state.isWeatherFetching);

  const isWeatherError = useAppStore((state) => state.isWeatherError);
  const weatherObj = decodiFyWeatherCode(
    weatherData?.current_weather.weathercode,
    weatherData?.current_weather.is_day
  );
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  const enterAnimation = async () => {
    await animate(scope.current, { opacity: 1, transition: { duration: 1.2 } });
  };

  const exitAnimation = async () => {
    await animate(scope.current, { opacity: 0, transition: { duration: 0.5 } });
  };

  useEffect(() => {
    if (isPresent) {
      enterAnimation();

      if (isWeatherFetching && !isWeatherError) {
        exitAnimation();
      }
    } else {
      safeToRemove();
    }
  }, [isWeatherFetching]);

  return (
    <div
      ref={scope}
      className="grid"
      style={{ backgroundImage: `url(${weatherObj.backgroundImg})` }}>
      <main className="grid__main">
        <InputSearchLocation />
        <DisplayFetchError />
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
