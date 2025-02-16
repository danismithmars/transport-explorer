import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer, { getVehicles } from "../features/vehicleSlice";
import { fetchVehiclePositions } from "../api/hslApi";

jest.mock("../api/hslApi");

describe("vehicleSlice", () => {

    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                vehicles: vehicleReducer,
            },
        });
    });

    it("should handle the getVehicles.pending action", () => {
        store.dispatch(getVehicles());

        const state = store.getState().vehicles;

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it("should handle the getVehicles.fulfilled action", async () => {
        const mockVehicles = [
            {
                longName: "Bus 1",
                mode: "BUS",
            },
            {
                longName: "Train 1",
                mode: "RAIL",
            },
        ];

        (fetchVehiclePositions as jest.Mock).mockResolvedValue(mockVehicles);

        await store.dispatch(getVehicles());

        const state = store.getState().vehicles;

        expect(state.loading).toBe(false);
        expect(state.vehicles).toEqual(mockVehicles);
        expect(state.error).toBeNull();
    });

    it("should handle the getVehicles.rejected action", async () => {
        const mockError = "Failed to fetch vehicles";
        (fetchVehiclePositions as jest.Mock).mockRejectedValue(new Error(mockError));

        await store.dispatch(getVehicles());

        const state = store.getState().vehicles;

        expect(state.loading).toBe(false);
        expect(state.vehicles).toEqual([]);
        expect(state.error).toBe(mockError);
    });
});
