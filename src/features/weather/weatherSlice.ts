import { StateCreator } from "zustand";
import { TAppStore } from "../../context/appStore";
import { IgetWeather, getWeather } from "./weather.service";
import { TForecast } from "./weatherTypes";

export interface WeatherSlice {
  fetchWeather: ({ lat, lon }: IgetWeather) => void;
  weatherData: TForecast | null;
  isWeatherFetching: boolean;
  isWeatherError: boolean;
}

export const createWeatherSlice: StateCreator<
  TAppStore,
  [],
  [],
  WeatherSlice
> = (set) => ({
  weatherData: null,
  isWeatherFetching: false,
  isWeatherError: false,

  fetchWeather: async ({ lat, lon }) => {
    try {
      set({ isWeatherFetching: true, isWeatherError: false });

      const data = await getWeather({ lat, lon });

      if (data) {
        set({ weatherData: data });
      }

      return data;
    } catch (e) {
      console.error(e);
      set({ isWeatherError: true });
    } finally {
      set({ isWeatherFetching: false });
    }
  },
});
