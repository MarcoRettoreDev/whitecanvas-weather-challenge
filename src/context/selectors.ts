import { TAppStore } from "./appStore";

export const weatherSelector = (state: TAppStore) => {
  const data = state.weatherData;
  return data;
};

export const getLocationSelector = (state: TAppStore) => {
  const data = state.locationData;
  return data;
};
