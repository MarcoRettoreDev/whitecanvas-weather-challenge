import { StateCreator } from "zustand";
import { TAppStore } from "../../context/appStore";
import { IgetLocation, getLocation } from "./location.service";
import { LocationTypes } from "./locationTypes";
import { keyBy } from "lodash-es";

export interface LocationSlice {
  fetchLocation: ({ queryCity }: IgetLocation) => void;
  selectLocation: (id: number) => void;
  toggleOpenSelector: () => void;
  selectedLocation: LocationTypes | null;
  locationData: Record<string, LocationTypes> | null;
  isLocationFetching: boolean;
  isLocationError: boolean;
  openSelector: boolean;
}

export const createLocationSlice: StateCreator<
  TAppStore,
  [],
  [],
  LocationSlice
> = (set, get) => ({
  selectedLocation: null,
  locationData: null,
  isLocationError: false,
  isLocationFetching: false,
  openSelector: false,

  fetchLocation: async ({ queryCity }) => {
    try {
      set({ isLocationFetching: true, isLocationError: false });
      const { data } = await getLocation({ queryCity });

      if (data) {
        const dataFormatted = data.map((item: LocationTypes, i: number) => ({
          ...item,
          id: i + 1,
        }));

        set({
          locationData: keyBy(dataFormatted, "id"),
          isLocationError: false,
        });
      }
    } catch (e) {
      console.error(e);
      set({ isLocationError: true });
    } finally {
      set({ isLocationFetching: false });
    }
  },

  selectLocation: (id: number) => {
    const location = get().locationData?.[id];
    if (location) {
      set({ selectedLocation: location });
      const { lat, lon } = location;
      get().fetchWeather({ lat, lon });
    } else {
      set({ selectedLocation: null });
    }
  },

  toggleOpenSelector: () => {
    set({ openSelector: !get().openSelector });
  },
});
