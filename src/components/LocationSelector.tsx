import { FC, useEffect, useRef, useState } from "react";
import { getLocationSelector } from "../context/selectors";
import { useAppStore } from "../context/appStore";
import { LoadingSpinner } from "./LoadingSpinner";
import { SearchNoResults } from "./SearchNoResults";

export const LocationSelector: FC = () => {
  const locationData = useAppStore((state) => getLocationSelector(state));
  const toggleOpenSelector = useAppStore((state) => state.toggleOpenSelector);
  const selectLocation = useAppStore((state) => state.selectLocation);
  const isLocationFetching = useAppStore((state) => state.isLocationFetching);
  const isLocationError = useAppStore((state) => state.isLocationError);

  const isSelectorOpen = useAppStore((state) => state.openSelector);
  const [selectedItem, setSelectedItem] = useState<number | null>(null); // Track the index of the selected item

  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (locationData && selectedItem === null) {
      setSelectedItem(0);
    }
    focusRef.current?.focus();
  }, [locationData, selectedItem]);

  const handlePressKey = (e: React.KeyboardEvent, id: number) => {
    if (e.code === "ArrowDown" && selectedItem !== null && locationData) {
      setSelectedItem((prev) =>
        prev !== null && prev < locationData.length - 1 ? prev + 1 : prev
      );
    } else if (e.code === "ArrowUp" && selectedItem !== null) {
      setSelectedItem((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    }

    if (e.code === "Enter") {
      selectLocation(id);
      toggleOpenSelector();
    }
  };

  useEffect(() => {
    if (isLocationError) {
      toggleOpenSelector();
    }
  }, [isLocationError]);

  if (!isSelectorOpen) return null;

  return (
    <div className="locationselector" onClick={toggleOpenSelector}>
      {isLocationFetching ? (
        <div className="locationselector__spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="locationselector__container">
          {locationData && locationData.length > 0 ? (
            locationData.map((data, i) => (
              <div
                key={data.id}
                onMouseEnter={() => {
                  setSelectedItem(i);
                }}
                onClick={() => selectLocation(data.id)}
                ref={i === 0 ? focusRef : null}
                tabIndex={selectedItem === i ? 0 : -1}
                onKeyDown={(e) => handlePressKey(e, data.id)}
                className={`locationselector__container__itemwrapper ${
                  selectedItem === i
                    ? "locationselector__container__itemwrapper--selected"
                    : ""
                }`}>
                <h4 className="locationselector__container__title">
                  {data.name}
                </h4>
                <span>{data.country}</span>
              </div>
            ))
          ) : (
            <SearchNoResults />
          )}
        </div>
      )}
    </div>
  );
};
