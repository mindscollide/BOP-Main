import { createSlice } from "@reduxjs/toolkit";



const bankSpotSlicer = createSlice({
    name: 'bankSpot',
    initialState: {
        bankSpotData: null,
        Loader: false
    },
    reducers: {
        getBankSpotData: (state, { payload }) => {
            state.bankSpotData = payload
            state.Loader = false
        },
        loaderInitialize: (state, { payload }) => {
            state.Loader = payload
        },

    }
});

export const { getBankSpotData, loaderInitialize } = bankSpotSlicer.actions;
export default bankSpotSlicer.reducer;

