import { getAllCategoryTableData } from "@/container/pages/mainCategory/categoryActions";
import { createSlice } from "@reduxjs/toolkit";

const categoryReducer = createSlice({
  name: "category",
  initialState: {
    responseMessage: "",
    Loader: false,
    getAllCategoriesRecords: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryTableData.pending, (state) => {
        state.Loader = true;
      })
      .addCase(getAllCategoryTableData.fulfilled, (state, { payload }) => {
        state.Loader = false;
        state.getAllCategoriesRecords = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(getAllCategoryTableData.rejected, (state, { payload }) => {
        state.Loader = false;
        state.getAllCategoriesRecords = null;
        state.responseMessage = payload;
      });
  },
});

export default categoryReducer.reducer;
