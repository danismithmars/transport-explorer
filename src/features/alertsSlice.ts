import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAlerts } from "../api/hslApi";

interface Alert {
  id: string;
  alertHeaderText: string;
  alertDescriptionText: string;
}

interface Delay {
  route: string;
  delayMinutes: number;
}

interface AlertsState {
  alerts: Alert[];
  delays: Delay[];
  loading: boolean;
  error: string | null;
}

const initialState: AlertsState = {
  alerts: [],
  delays: [],
  loading: false,
  error: null,
};

// Fetch alerts from API
export const getAlerts = createAsyncThunk("alerts/getAlerts", async () => {
  const alerts = await fetchAlerts();

  const delays: Delay[] = (alerts || [])
    .filter((alert: Alert) => alert?.alertDescriptionText?.toLowerCase().includes("delay"))
    .map((alert: Alert) => {
      const match = alert.alertDescriptionText.match(/(\d+) min/i);
      const delayMinutes = match ? parseInt(match[1], 10) : 0;
      return {
        route: alert.alertHeaderText.replace("Delay on ", ""),
        delayMinutes,
      };
    });

  return { alerts, delays };
});

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlerts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = action.payload.alerts;
        state.delays = action.payload.delays;
        state.error = null; // Clear the error when the request is fulfilled
      })
      .addCase(getAlerts.rejected, (state, action) => {
        state.loading = false;
        // Safely access error message
        const errorMessage = (action.error as { message: string }).message || "Failed to fetch alerts";
        state.error = errorMessage;
      });
  },
});

export default alertsSlice.reducer;

