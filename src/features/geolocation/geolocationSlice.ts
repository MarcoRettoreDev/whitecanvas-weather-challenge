import { StateCreator } from "zustand";
import { TAppStore } from "../../context/appStore";

export interface TGeoLocation {
  userLat: undefined | number;
  userLng: undefined | number;
  checkUserGeoLocation: () => void;
}

export const createGeoLocationSlice: StateCreator<
  TAppStore,
  [],
  [],
  TGeoLocation
> = (set, get) => ({
  userLat: undefined,
  userLng: undefined,

  checkUserGeoLocation: async () => {
    function success(position: GeolocationPosition) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      set({
        userLat: latitude,
        userLng: longitude,
      });

      get().fetchLocationLatLon({ lat: latitude, lon: longitude });
    }

    function error(e: unknown) {
      console.warn(e);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Unable to retrieve your location ");
    }
  },
});
