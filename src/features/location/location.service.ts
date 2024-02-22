import axios, { AxiosResponse } from "axios";

export interface IgetLocation {
  queryCity: string;
}

export const getLocation = async ({
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
