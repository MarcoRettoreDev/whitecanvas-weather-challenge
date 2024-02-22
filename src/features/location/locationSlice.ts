import { StateCreator } from "zustand";
import { TAppStore } from "../../context/appStore";
import { IgetLocation, getLocation } from "./location.service";

export interface LocationSlice {
  fetchLocation: ({ queryCity }: IgetLocation) => Promise<unknown>;
  locationData: unknown | null;
  isLocationFetching: boolean;
  isLocationError: boolean;
}

export const createLocationSlice: StateCreator<
  TAppStore,
  [],
  [],
  LocationSlice
> = (set) => ({
  locationData: null,
  isLocationError: false,
  isLocationFetching: false,

  fetchLocation: async ({ queryCity }) => {
    try {
      set({ isLocationFetching: true, isLocationError: false });

      const data = await getLocation({ queryCity });

      if (data) {
        set({ locationData: data });
      }

      return data;
    } catch (e) {
      console.error(e);
      set({ isLocationError: true });
    } finally {
      set({ isLocationFetching: false });
    }
  },
});
