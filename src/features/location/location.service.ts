import axios from "axios";

export interface IgetLocation {
  queryCity: string;
}

export const getLocation = async ({
  queryCity,
}: IgetLocation): Promise<unknown> => {
  const { data } = await axios<unknown>({
    url: `${
      import.meta.env.VITE_API_LOCATION_BASE_ENDPOINT
    }/direct?q=${queryCity}&limit=5&appid=${
      import.meta.env.VITE_API_LOCATION_KEY
    }`,
    method: "get",
  });

  return data;
};
