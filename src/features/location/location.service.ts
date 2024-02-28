import axios, { AxiosResponse } from "axios";

export interface IgetLocation {
  queryCity: string;
}

export const getLocationByCity = async ({
  queryCity,
}: IgetLocation): Promise<AxiosResponse> => {
  return axios.get(
    `${
      import.meta.env.VITE_API_LOCATION_BASE_ENDPOINT
    }/direct?q=${queryCity}&limit=5&appid=${
      import.meta.env.VITE_API_LOCATION_KEY
    }`
  );
};

export interface IgetLocationLatLon {
  lat: number;
  lon: number;
}

export const getLocationByLatLon = async ({
  lat,
  lon,
}: IgetLocationLatLon): Promise<AxiosResponse> => {
  return axios.get(
    `${
      import.meta.env.VITE_API_LOCATION_BASE_ENDPOINT
    }/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${
      import.meta.env.VITE_API_LOCATION_KEY
    }`
  );
};
