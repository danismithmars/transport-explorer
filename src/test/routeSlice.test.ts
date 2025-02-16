import { configureStore } from "@reduxjs/toolkit";
import routeReducer, { getRoutePlan } from "../features/routeSlice"; // Adjust paths as necessary
import { fetchRoutePlan } from "../api/hslApi"; // Ensure you mock the API function

jest.mock("../api/hslApi");

describe("routeSlice", () => {

    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                routes: routeReducer,
            },
        });
    });

    it("should handle the getRoutePlan.pending action", () => {
        store.dispatch(getRoutePlan({ from: "60.1699,24.9384", to: "60.176109,24.96105" }));

        const state = store.getState().routes;

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it("should handle the getRoutePlan.fulfilled action", async () => {
        const mockRouteData = [
            {
                legs: [
                    {
                        mode: "BUS",
                        from: { name: "Start", lat: 60.1699, lon: 24.9384 },
                        to: { name: "End", lat: 60.176109, lon: 24.96105 },
                        startTime: "10:00",
                        endTime: "10:30",
                        duration: 30,
                        distance: 5,
                        legGeometry: { points: "some-geometry-data" },
                    },
                ],
            },
        ];

        (fetchRoutePlan as jest.Mock).mockResolvedValue(mockRouteData);

        await store.dispatch(getRoutePlan({ from: "60.1699,24.9384", to: "60.176109,24.96105" }));

        const state = store.getState().routes;

        expect(state.loading).toBe(false);
        expect(state.itineraries).toEqual(mockRouteData);
        expect(state.error).toBeNull();
    });

    it("should handle the getRoutePlan.rejected action", async () => {
        const mockError = "Failed to fetch route plan";
        (fetchRoutePlan as jest.Mock).mockRejectedValue(new Error(mockError));

        await store.dispatch(getRoutePlan({ from: "60.1699,24.9384", to: "60.176109,24.96105" }));

        const state = store.getState().routes;

        expect(state.loading).toBe(false);
        expect(state.itineraries).toEqual([]);
        expect(state.error).toBe(mockError);
    });
});
