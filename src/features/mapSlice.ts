import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
    center: [number, number];
}

const initialState: MapState = {
    center: [60.1699, 24.9384],
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setMapCenter: (state, action: PayloadAction<[number, number]>) => {
            state.center = action.payload;
        },
    },
});

export const { setMapCenter } = mapSlice.actions;
export default mapSlice.reducer;
