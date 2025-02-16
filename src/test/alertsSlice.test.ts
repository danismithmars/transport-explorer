import { configureStore } from "@reduxjs/toolkit";
import alertsReducer, { getAlerts } from "../features/alertsSlice"; // Adjust import paths if needed
import { fetchAlerts } from "../api/hslApi"; // Make sure fetchAlerts is imported correctly

// Mocking fetchAlerts API call
jest.mock("../api/hslApi", () => ({
  fetchAlerts: jest.fn(),
}));

describe("alertsSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        alerts: alertsReducer,
      },
    });
  });

  it("should handle initial state", () => {
    const state = store.getState().alerts;
    expect(state.alerts).toEqual([]);
    expect(state.delays).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("should handle getAlerts pending", () => {
    store.dispatch(getAlerts.pending(""));
    const state = store.getState().alerts;
    expect(state.loading).toBe(true);
  });

  it("should handle getAlerts rejected", async () => {
    (fetchAlerts as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch alerts"));

    await store.dispatch(getAlerts());

    const state = store.getState().alerts;
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to fetch alerts");
  });
});
