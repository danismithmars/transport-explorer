import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRoutePlan } from "../api/hslApi";

interface RouteLeg {
  mode: string;
  from: {
    name: string;
    lat: number;
    lon: number;
  }
  to: {
    name: string;
    lat: number;
    lon: number;
  }
  startTime: string;
  endTime: string;
  duration: number;
  distance: number;
  legGeometry: {
    points: string;
  }
}

interface Itinerary {
  legs: RouteLeg[];
}

interface RouteState {
  itineraries: Itinerary[];
  loading: boolean;
  error: string | null;
}

const initialState: RouteState = {
  itineraries: [],
  loading: false,
  error: null,
};

export const getRoutePlan = createAsyncThunk(
  "routes/getRoutePlan",
  async ({ from, to }: { from: string; to: string }) => {
    return await fetchRoutePlan(from, to);
  }
);

const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoutePlan.pending, (state) => { state.loading = true; })
      .addCase(getRoutePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.itineraries = action.payload;
      })
      .addCase(getRoutePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch route plan";
      });
  },
});

export default routeSlice.reducer;
