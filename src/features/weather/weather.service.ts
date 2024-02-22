import axios from "axios";
import { TForecast } from "./weatherTypes";

export interface IgetWeather {
  lat: string;
  lon: string;
}

export const getWeather = async ({
  lat,
  lon,
}: IgetWeather): Promise<TForecast> => {
  const { data } = await axios<TForecast>({
    url: `${
      import.meta.env.VITE_API_FORECAST
    }/forecast?latitude=${lat}&longitude=${lon}&daily=apparent_temperature_max,apparent_temperature_min,precipitation_probability_mean,weathercode,windspeed_10m_max&timezone=America%2FArgentina%2FRio_Gallegos&current_weather=true`,

    method: "get",
  });

  return data;
};
