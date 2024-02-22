import { FC, useState } from "react";
import { deburr } from "lodash-es";
import magnifyIcon from "../assets/svg/search.svg";
import { useAppStore } from "../context/appStore";

export const InputSearchLocation: FC = () => {
  const [searchedText, setSearchedText] = useState("");
  const fetchLocation = useAppStore((state) => state.fetchLocation);
  const isLocationError = useAppStore((state) => state.isLocationError);
  const isLocationFetching = useAppStore((state) => state.isLocationFetching);

  const sanitizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const sanitized = deburr(value.toLowerCase());
    setSearchedText(sanitized);
  };

  const test = (a: React.KeyboardEvent<HTMLInputElement>) => {
    if (a.key === "Enter" || a.code === "13") {
      fetchLocation({ queryCity: searchedText });
    }
  };

  if (isLocationFetching) {
    console.log("FETCHING");
  }

  if (isLocationError) {
    console.log("ERRRRORRR");
  }

  return (
    <div className="inputsearchlocation">
      <input
        className="inputsearchlocation__input"
        type="text"
        name=""
        placeholder="Search Location..."
        id=""
        value={searchedText}
        onKeyDown={(e) => test(e)}
        onChange={(e) => sanitizeInput(e)}
      />
      <img className="inputsearchlocation__icon" src={magnifyIcon} alt="" />
    </div>
  );
};
