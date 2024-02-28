import { FC, useState } from "react";
import { useAppStore } from "../context/appStore";
import { weatherDaysDataSelector } from "../context/selectors";
import {
  decodiFyWeatherCode,
  formatCurrentWeatherObject,
} from "../helpers/weatherHelper";
import { LoadingSpinner } from "./LoadingSpinner";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { WeatherData } from "../features/weather/weatherTypes";
import dayjs from "dayjs";

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

const infoitemAnimationVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: (i) => ({
    opacity: 1,
    transition: {
      delay: 0.05 * i,
    },
  }),
};

const showmoreVariants: Variants = {
  initial: {
    y: -50,
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

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

  if (!data) return null;

  return (
    <div className="extendeddayssection">
      <h3 className="extendeddayssection_title">Extended forecast</h3>
      <div className="extendeddayssection__rangewrapper">
        {selectOptions.map((dayopt, i) => (
          <RangeOption
            index={i}
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
        {data?.map((item, index) => (
          <InfoItem key={index} weatherItem={item} i={index} />
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
  index: number;
};

const RangeOption: FC<TRangeOption> = ({
  value,
  label,
  handleClick,
  selected,
  index,
}) => (
  <div
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleClick(value);
      }
    }}
    tabIndex={index + 1}
    aria-label={`extendforecast-${value}`}
    className={`extendeddayssection__rangewrapper_rangeoption ${selected}`}
    onClick={() => handleClick(value)}>
    {label}
  </div>
);

type TInfoItem = {
  weatherItem: WeatherData;
  i: number;
};

const InfoItem: FC<TInfoItem> = ({ weatherItem, i }) => {
  const {
    dayNumber,
    maxTemp,
    minTemp,
    weathercode,
    chanceToRain,
    humidity,
    wind,
  } = weatherItem;

  const [showMore, setShowMore] = useState<boolean>(false);

  const { weatherDetail, icon } = decodiFyWeatherCode(weathercode, 1);
  const chanceToRainData = formatCurrentWeatherObject(
    "chanceToRain",
    chanceToRain
  );
  const maxTempData = formatCurrentWeatherObject("maxTemp", maxTemp);
  const minTempData = formatCurrentWeatherObject("minTemp", minTemp);
  const humidityData = formatCurrentWeatherObject("humidity", humidity);
  const windData = formatCurrentWeatherObject("wind", wind);
  const dateFormatted = dayjs(dayNumber).format("dddd D, MMM");

  return (
    <>
      <motion.div
        tabIndex={i + 4}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setShowMore(!showMore);
          }
        }}
        variants={infoitemAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        custom={i}
        onClick={() => setShowMore(!showMore)}
        className="extendeddayssection__rangeshow__infoitem">
        <div className="extendeddayssection__rangeshow__infoitem__leftwrapper">
          <img
            className="extendeddayssection__rangeshow__infoitem_icon"
            src={icon}
            alt=""
          />
          <h3>{dateFormatted}</h3>
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
      </motion.div>
      <AnimatePresence mode="wait">
        {showMore && (
          <motion.div
            onClick={() => setShowMore(!showMore)}
            className="extendeddayssection__rangeshow__infoitem extendeddayssection__rangeshow__infoitem--displayed"
            variants={showmoreVariants}
            initial="initial"
            animate="animate"
            exit="exit">
            <div className="extendeddayssection__rangeshow__infoitem__leftwrapper extendeddayssection__rangeshow__infoitem__leftwrapper--showmore">
              <h3>{weatherDetail}</h3>
            </div>

            <div className="extendeddayssection__rangeshow__infoitem__rightwrapper">
              <div className="extendeddayssection__rangeshow__infoitem__rightwrapper__itemcontainer">
                <h3> {windData?.value}</h3>

                <img
                  src={windData?.icon}
                  alt=""
                  className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer__item_icon"
                />
              </div>
              <div className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer--showmore">
                <div className="extendeddayssection__rangeshow__infoitem__rightwrapper__itemcontainer">
                  <h3>{humidityData?.value}</h3>
                  <img
                    src={humidityData?.icon}
                    className="extendeddayssection__rangeshow__infoitem__rightwrapper__temperaturecontainer__item_icon"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
