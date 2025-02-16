import { configureStore } from "@reduxjs/toolkit";
import stopReducer, { getStops } from "../features/stopSlice";
import { fetchStops } from "../api/hslApi";

jest.mock("../api/hslApi");

describe("stopSlice", () => {

    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                stops: stopReducer,
            },
        });
    });

    it("should handle the getStops.pending action", () => {
        store.dispatch(getStops("test"));

        const state = store.getState().stops;

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it("should handle the getStops.fulfilled action", async () => {
        const mockStops = [
            {
                gtfsId: "1",
                name: "Stop A",
                lat: 60.1699,
                lon: 24.9384,
                code: "A",
                vehicleMode: "BUS",
                zoneId: "1",
                patterns: [],
            },
            {
                gtfsId: "2",
                name: "Stop B",
                lat: 60.1761,
                lon: 24.9611,
                code: "B",
                vehicleMode: "TRAM",
                zoneId: "2",
                patterns: [],
            },
        ];

        (fetchStops as jest.Mock).mockResolvedValue(mockStops);

        await store.dispatch(getStops("A"));

        const state = store.getState().stops;

        expect(state.loading).toBe(false);
        expect(state.stops).toEqual([mockStops[0]]);
        expect(state.error).toBeNull();
    });

    it("should handle the getStops.rejected action", async () => {
        const mockError = "Failed to fetch stops";
        (fetchStops as jest.Mock).mockRejectedValue(new Error(mockError));

        await store.dispatch(getStops("A"));

        const state = store.getState().stops;

        expect(state.loading).toBe(false);
        expect(state.stops).toEqual([]);
        expect(state.error).toBe(mockError);
    });
});
