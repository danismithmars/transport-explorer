import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStops } from "../api/hslApi";

interface Stop {
  gtfsId: string;
  name: string;
  lat: number;
  lon: number;
  code: string;
  vehicleMode: string;
  zoneId: string;
  patterns: Pattern[];
}

interface Pattern {
  code: string;
  directionId: number;
  headsign: string;
  route: {
    gtfsId: string;
    shortName: string;
    longName: string;
    mode: string;
  };
}


interface StopState {
  stops: Stop[];
  loading: boolean;
  error: string | null;
}

const initialState: StopState = {
  stops: [],
  loading: false,
  error: null,
};

export const getStops = createAsyncThunk("stops/getStops", async (query: string) => {
  const stops = await fetchStops();
  return stops.filter((stop: Stop) => stop.name.toLowerCase().includes(query.toLowerCase()));
});

const stopSlice = createSlice({
  name: "stops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStops.pending, (state) => { state.loading = true; })
      .addCase(getStops.fulfilled, (state, action) => {
        state.loading = false;
        state.stops = action.payload;
      })
      .addCase(getStops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch stops";
      });
  },
});

export default stopSlice.reducer;
