import { create } from "zustand";
import {
  createWeatherSlice,
  WeatherSlice,
} from "../features/weather/weatherSlice";
import {
  LocationSlice,
  createLocationSlice,
} from "../features/location/locationSlice";
import {
  TGeoLocation,
  createGeoLocationSlice,
} from "../features/geolocation/geolocationSlice";

export type TAppStore = WeatherSlice & LocationSlice & TGeoLocation;

export const useAppStore = create<TAppStore>((set, get, store) => ({
  ...createWeatherSlice(set, get, store),
  ...createLocationSlice(set, get, store),
  ...createGeoLocationSlice(set, get, store),
}));
