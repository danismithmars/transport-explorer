import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "../features/vehicleSlice";
import stopReducer from "../features/stopSlice";
import routeReducer from "../features/routeSlice";
import alertsReducer from "../features/alertsSlice";
import preferencesReducer from "../features/preferencesSlice";
import mapReducer from "../features/mapSlice";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    vehicles: vehicleReducer,
    stops: stopReducer,
    routes: routeReducer,
    alerts: alertsReducer,
    preferences: preferencesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
