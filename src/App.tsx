import { FC } from "react";
import "./scss/style.scss";
import { CentralPanel } from "./components/CentralPanel";

const App: FC = () => {
  return (
    <div className="background">
      <CentralPanel />
    </div>
  );
};

export default App;
