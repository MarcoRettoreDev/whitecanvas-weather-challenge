import { StateCreator } from "zustand";
import { TAppStore } from "../../context/appStore";
import { IgetLocation, getLocation } from "./location.service";
import { LocationTypes } from "./locationTypes";
import { keyBy } from "lodash-es";

export interface LocationSlice {
  fetchLocation: ({ queryCity }: IgetLocation) => void;
  selectedLocation: LocationTypes | null;
  locationData: Record<string, LocationTypes> | null;
  isLocationFetching: boolean;
  isLocationError: boolean;
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
    set({ selectedLocation: get().locationData?.[id] ?? null });
    return;
  },
});
