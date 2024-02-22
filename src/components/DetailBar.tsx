import { FC } from "react";
import highTemperatureIcon from "../assets/svg/temperature-high.svg";
import lowTemperatureIcon from "../assets/svg/temperature-low.svg";
import humidityIcon from "../assets/svg/humidity.svg";
import cloudIcon from "../assets/svg/cloudy.svg";
import windIcon from "../assets/svg/wind.svg";

const fakeData = [
  {
    text: "Temp max",
    degree: 19,
    icon: highTemperatureIcon,
  },
  {
    text: "Temp min",
    degree: 15,
    icon: lowTemperatureIcon,
  },
  {
    text: "Humadity",
    degree: 58,
    icon: humidityIcon,
  },
  {
    text: "Cloudy",
    degree: 86,
    icon: cloudIcon,
  },
  {
    text: "Wind",
    degree: 5,
    icon: windIcon,
  },
];

export const DetailBar: FC = () => {
  return (
    <div className="detailbar">
      <h3 className="detailbar__title">Weather Details...</h3>
      <h3 className="detailbar__subtitle">thunderstorm with light drizzle</h3>
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
      <div className="detailstats__rightsection">
        <p className="detailstats__rightsection_text">{degree}</p>
        {icon ? (
          <div
            className="detailstats__rightsection_icon"
            style={{ backgroundImage: `url(${icon})` }}></div>
        ) : null}
      </div>
    </div>
  );
};
