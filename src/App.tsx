import { FC } from "react";
import "./scss/style.scss";
import { Grid } from "./components/Grid";
import usePrecacheImages from "./hooks/usePrecacheImages";
import { backgroundImagesSrc } from "./helpers/weatherHelper";

const App: FC = () => {
  usePrecacheImages(backgroundImagesSrc);

  return <Grid />;
};

export default App;
