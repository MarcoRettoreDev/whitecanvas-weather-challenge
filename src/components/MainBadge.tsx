import { FC } from "react";
import fakeIcon from "../assets/svg/cloudy.svg";

export const MainBadge: FC = () => {
  return (
    <div className="mainbadge">
      <h1 className="mainbadge__degree">16°</h1>
      <div className="mainbadge__textwrapper">
        <h2 className="mainbadge__textwrapper_city">London</h2>
        <h4 className="mainbadge__textwrapper_datetime">
          06:09 - Monday, 9 Sep '23
        </h4>
      </div>
      <img className="mainbadge__icon" src={fakeIcon}></img>
    </div>
  );
};
