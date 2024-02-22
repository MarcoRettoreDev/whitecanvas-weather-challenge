import { create } from "zustand";
import {
  createWeatherSlice,
  WeatherSlice,
} from "../features/weather/weatherSlice";
import {
  LocationSlice,
  createLocationSlice,
} from "../features/location/locationSlice";

type AppState = {};

export type TAppStore = AppState & WeatherSlice & LocationSlice;

export const useAppStore = create<TAppStore>((set, get, store) => ({
  ...createWeatherSlice(set, get, store),
  ...createLocationSlice(set, get, store),
}));
