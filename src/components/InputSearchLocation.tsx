import { FC, useState } from "react";
import { deburr } from "lodash-es";
import magnifyIcon from "../assets/svg/search.svg";

export const InputSearchLocation: FC = () => {
  const [searchedText, setSearchedText] = useState("");

  const sanitizeInput = (value: string) => {
    const sanitized = deburr(value.toLowerCase());
    setSearchedText(sanitized);
  };

  return (
    <div className="inputsearchlocation">
      <input
        className="inputsearchlocation__input"
        type="text"
        name=""
        placeholder="Search Location..."
        id=""
        value={searchedText}
        onChange={(e) => sanitizeInput(e.target.value)}
      />
      <img className="inputsearchlocation__icon" src={magnifyIcon} alt="" />
    </div>
  );
};
