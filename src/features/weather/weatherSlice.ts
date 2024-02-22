import { StateCreator } from "zustand";
import { TAppStore } from "../../context/appStore";
import { IgetWeather, getWeather } from "./weather.service";
import { TForecast } from "./weatherTypes";

export interface WeatherSlice {
  fetchWeather: ({ lat, lon }: IgetWeather) => Promise<TForecast>;
  weatherData: TForecast | null;
}

export const createWeatherSlice: StateCreator<
  TAppStore,
  [],
  [],
  WeatherSlice
> = (set) => ({
  weatherData: null,

  fetchWeather: async ({ lat, lon }) => {
    const data = await getWeather({ lat, lon });
    console.log(data);

    if (data) {
      set({ weatherData: data });
    }

    return data;
  },
});
