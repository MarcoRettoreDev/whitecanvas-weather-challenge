import { FC } from "react";

import { weatherCurrentDaySelector } from "../context/selectors";
import { useAppStore } from "../context/appStore";
import { InputSearchLocation } from "./InputSearchLocation";

export const DetailBar: FC = () => {
  const data = useAppStore((state) => weatherCurrentDaySelector(state));

  return (
    <div className="detailbar">
      <InputSearchLocation />

      <h3 className="detailbar__title">Weather Details...</h3>
      <h3 className="detailbar__subtitle">thunderstorm with light drizzle</h3>
      {data?.map((item) => (
        <DetailStats
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
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
    <div className="detailstats">
      <h3 className="detailstats__title">{title}</h3>
      <div className="detailstats__rightsection">
        <p className="detailstats__rightsection_text">{value}</p>
        {icon ? (
          <div
            className="detailstats__rightsection_icon"
            style={{ backgroundImage: `url(${icon})` }}></div>
        ) : null}
      </div>
    </div>
  );
};
