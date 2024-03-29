import { FC, useState } from "react";
import { deburr } from "lodash-es";
import magnifyIcon from "../assets/svg/search.svg";
import { useAppStore } from "../context/appStore";
import usePreviousProps from "../hooks/usePreviousProps";

export const InputSearchLocation: FC = () => {
  const toggleOpenSelector = useAppStore((state) => state.toggleOpenSelector);
  const fetchLocationCity = useAppStore((state) => state.fetchLocationCity);

  const [searchedText, setSearchedText] = useState("");
  const previousValue = usePreviousProps(searchedText);
  const hasInputChanged = previousValue !== searchedText;

  const sanitizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const sanitized = deburr(value.toLowerCase());
    setSearchedText(sanitized);
  };

  const enterKeyHandler = (a: React.KeyboardEvent<HTMLInputElement>) => {
    if (a.key === "Enter" || a.code === "13") {
      dispatchQuery();
    }
  };

  const dispatchQuery = () => {
    if (searchedText.length >= 1) {
      toggleOpenSelector();
    }

    if (hasInputChanged) {
      fetchLocationCity({ queryCity: searchedText });
    }
  };

  return (
    <div className="inputsearchlocation">
      <input
        aria-label="search"
        tabIndex={1}
        className="inputsearchlocation__input"
        type="text"
        name=""
        placeholder="Search Location..."
        id=""
        value={searchedText}
        onKeyDown={(e) => enterKeyHandler(e)}
        onChange={(e) => sanitizeInput(e)}
      />
      <img
        className="inputsearchlocation__icon"
        src={magnifyIcon}
        alt=""
        onClick={dispatchQuery}
      />
    </div>
  );
};
