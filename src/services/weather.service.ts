import axios from "axios";

interface TWeather {}

export const getWeather = async (): Promise<TWeather> => {
  return axios.get("", {});
};
