import axios from "axios";
import { TForecast } from "./weatherTypes";

export interface IgetWeather {
  lat: number;
  lon: number;
}

export const getWeather = async ({
  lat,
  lon,
}: IgetWeather): Promise<TForecast> => {
  const { data } = await axios<TForecast>({
    url: `${
      import.meta.env.VITE_API_FORECAST
    }/forecast?latitude=${lat}&longitude=${lon}&forecast_days=16&daily=uv_index_max,apparent_temperature_max,apparent_temperature_min,precipitation_probability_mean,weathercode,windspeed_10m_max&current_weather=true&current=is_day&timezone=auto`,
    method: "get",
  });

  return data;
};
