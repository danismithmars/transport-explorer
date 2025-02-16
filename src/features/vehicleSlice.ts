import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVehiclePositions } from "../api/hslApi";

interface Vehicle {
  longName: string;
  mode: string;
}

interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  loading: false,
  error: null,
};

export const getVehicles = createAsyncThunk("vehicles/getVehicles", async () => {
  return await fetchVehiclePositions();
});

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVehicles.pending, (state) => { state.loading = true; })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch vehicles";
      });
  },
});

export default vehicleSlice.reducer;
