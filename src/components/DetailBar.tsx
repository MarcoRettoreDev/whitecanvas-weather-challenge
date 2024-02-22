import { FC } from "react";
import highTemperature from "../assets/svg/temperature-high.svg";

const fakeData = [
  {
    text: "Temp max",
    degree: 19,
    icon: highTemperature,
  },
  {
    text: "Temp min",
    degree: 15,
  },
  {
    text: "Humadity",
    degree: 58,
  },
  {
    text: "Cloudy",
    degree: 86,
  },
  {
    text: "Wind",
    degree: 5,
  },
];

export const DetailBar: FC = () => {
  return (
    <div className="detailsbar">
      <h3 className="detailsbar__title">Weather details...</h3>
      <h3 className="detailsbar__subtitle">thunderstorm with light drizzle</h3>
      {fakeData.map((item) => (
        <DetailStats title={item.text} degree={item.degree} icon={item.icon} />
      ))}
    </div>
  );
};

interface DetailStats {
  title: string;
  degree: number;
  icon?: string;
}

const DetailStats: FC<DetailStats> = ({ title, degree, icon }) => {
  return (
    <div className="detailstats">
      <h3 className="detailstats__title">{title}</h3>
      <div className="detailstats__rightsection_wrapper">
        <p className="detailstats__rightsection_text">{degree}</p>
        {icon ? (
          <img className="detailstats__rightsection_icon" src={icon}></img>
        ) : null}
      </div>
    </div>
  );
};
