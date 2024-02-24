import { FC, useState } from "react";
import { useAppStore } from "../context/appStore";
import { weatherDaysDataSelector } from "../context/selectors";
import {
  decodiFyWeatherCode,
  formatCurrentWeatherObject,
} from "../helpers/weatherHelper";
import { LoadingSpinner } from "./LoadingSpinner";
import { format } from "date-fns";

const selectOptions = [
  {
    id: 1,
    value: 5,
    label: "5 days",
  },
  {
    id: 2,
    value: 10,
    label: "10 days",
  },
  {
    id: 3,
    value: 15,
    label: "15 days",
  },
];

export const ExtendedDaysSection: FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(5);
  const isFetchingData = useAppStore((state) => state.isWeatherFetching);
  const data = useAppStore((state) =>
    weatherDaysDataSelector(state, selectedOption)
  );

  const selectRangeHandler = (value: number) => {
    setSelectedOption(value);
  };

  if (isFetchingData) return <LoadingSpinner />;
  return (
    <div className="extendeddayssection">
      <h3 className="extendeddayssection_title">Extended forecast</h3>
      <div className="extendeddayssection__rangewrapper">
        {selectOptions.map((dayopt) => (
          <RangeOption
            key={dayopt.id}
            value={dayopt.value}
            label={dayopt.label}
            selected={
              dayopt.value === selectedOption
                ? "extendeddayssection__rangewrapper_rangeoption--selected"
                : ""
            }
            handleClick={selectRangeHandler}
          />
        ))}
      </div>
      <div className="extendeddayssection__rangeshow">
        {data?.map((item) => (
          <InfoItem
            dayNumber={item.dayNumber}
            maxTemp={item.maxTemp}
            minTemp={item.minTemp}
            weathercode={item.weathercode}
            chanceToRain={item.chanceToRain}
          />
        ))}
      </div>
    </div>
  );
};

type TRangeOption = {
  value: number;
  label: string;
  selected: string;
  handleClick: (id: number) => void;
};

const RangeOption: FC<TRangeOption> = ({
  value,
  label,
  handleClick,
  selected,
}) => (
  <div
    className={`extendeddayssection__rangewrapper_rangeoption ${selected}`}
    onClick={() => handleClick(value)}>
    {label}
  </div>
);

type TInfoItem = {
  dayNumber: string;
  maxTemp: number;
  minTemp: number;
  weathercode: number;
  chanceToRain: string;
};

const InfoItem: FC<TInfoItem> = ({
  dayNumber,
  maxTemp,
  minTemp,
  weathercode,
  chanceToRain,
}) => {
  const { icon } = decodiFyWeatherCode(weathercode, 1);
  const chanceToRainData = formatCurrentWeatherObject(
    "chanceToRain",
    chanceToRain
  );
  const maxTempData = formatCurrentWeatherObject("maxTemp", maxTemp);
  const minTempData = formatCurrentWeatherObject("minTemp", minTemp);
  const dateFomrmatted = format(new Date(dayNumber), "EEEE d, MMM");

  return (
    <div className="extendeddayssection__rangeshow__infoitem">
      <div className="extendeddayssection__rangeshow__infoitem__leftwrapper">
        <img
          className="extendeddayssection__rangeshow__infoitem_icon"
          src={icon}
          alt=""
        />
        <h3>{dateFomrmatted}</h3>
      </div>

      <div className="extendeddayssection__rangeshow__infoitem__rightwrapper">
        <div className="extendeddayssection__rangeshow__infoitem__rightwrapper__itemcontainer">
          <h3>{chanceToRainData?.value}</h3>
          <img
            src={chanceToRainData?.icon}
            alt=""
            className="extendeddayssection__rangeshow__infoitem__rightwrapper__itemcontainer_icon"
          />
        </div>

        <div className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer">
          <div className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer__item">
            <h3 className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer__item_text">
              {minTempData?.value}
            </h3>
            <img
              src={minTempData?.icon}
              alt=""
              className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer__item_icon"
            />
          </div>
          <div className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer__item">
            <h3 className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer__item_text">
              {maxTempData?.value}
            </h3>
            <img
              src={maxTempData?.icon}
              alt=""
              className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer__item_icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
