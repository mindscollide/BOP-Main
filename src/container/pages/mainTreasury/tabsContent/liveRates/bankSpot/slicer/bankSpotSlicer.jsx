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
        }
    }
});

export const { getBankSpotData } = bankSpotSlicer.actions;
export default bankSpotSlicer.reducer;

