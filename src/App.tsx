import { FC, useEffect } from "react";
import "./scss/style.scss";
import { Grid } from "./components/Grid";
import usePrecacheImages from "./hooks/usePrecacheImages";
import { backgroundImagesSrc } from "./helpers/weatherHelper";
import { useAppStore } from "./context/appStore";

const App: FC = () => {
  const checkUserGeoLocation = useAppStore(
    (state) => state.checkUserGeoLocation
  );
  usePrecacheImages(backgroundImagesSrc);

  useEffect(() => {
    checkUserGeoLocation();
  }, []);

  return <Grid />;
};

export default App;
