import { createSlice } from "@reduxjs/toolkit";

const misSlicer = createSlice({
    name: 'bankSpot',
    initialState: {
        misData: null,
        Loader: false
    },
    reducers: {
        getMisData: (state, { payload }) => {
            state.misData = payload
            state.Loader = false
        },
        loaderInitializeMis: (state, { payload }) => {
            state.Loader = payload
        },

    }
});

export const { getMisData, loaderInitializeMis } = misSlicer.actions;
export default misSlicer.reducer;