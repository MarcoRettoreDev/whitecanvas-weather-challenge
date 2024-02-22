import { FC, useEffect } from "react";
import "./scss/style.scss";
import { useAppStore } from "./context/appStore";
import { CentralPanel } from "./components/CentralPanel";
import { getLocationSelector, weatherSelector } from "./context/selectors";

const App: FC = () => {
  // const fetchWeather = useAppStore((state) => state.fetchWeather);
  // const fetchLocation = useAppStore((state) => state.fetchLocation);
  // const weatherData = useAppStore((state) => weatherSelector(state));
  // const locationData = useAppStore((state) => getLocationSelector(state));

  // useEffect(() => {
  //   //   fetchWeather({ lat: "-34.60", lon: "-58.38" });
  //   fetchLocation({ queryCity: "dasdsa" });
  // }, []);

  return (
    <div className="background">
      <CentralPanel />
    </div>
  );
};

export default App;
