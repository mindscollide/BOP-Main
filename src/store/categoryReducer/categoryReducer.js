
  import { createSlice } from "@reduxjs/toolkit";
  
  const categoryReducer = createSlice({
    name: "category",
    initialState: {
      responseMessage: "",
      loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
    
    },
  });
  
  export default categoryReducer.reducer;
  