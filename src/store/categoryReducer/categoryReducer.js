import { getAllCategoryTableData } from "@/container/pages/mainCategory/categoryActions";
import { createSlice } from "@reduxjs/toolkit";

const categoryReducer = createSlice({
  name: "category",
  initialState: {
    responseMessage: "",
    loading: false,
    getAllCategoriesRecords: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoryTableData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoryTableData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.getAllCategoriesRecords = payload.response;
        state.responseMessage = payload.message;
      })
      .addCase(getAllCategoryTableData.rejected, (state, { payload }) => {
        state.loading = false;
        state.getAllCategoriesRecords = null;
        state.responseMessage = payload;
      });
  },
});

export default categoryReducer.reducer;
