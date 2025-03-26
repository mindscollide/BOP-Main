import { getAllCategoriesRM } from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the login async thunk
export const getAllCategoriesAction = createAsyncThunk(
  "auth/getAllCategories", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", getAllCategoriesRM.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: authApi,
        data: form,
        headers, // Use custom headers here
      });
      if (response.data.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getAllCategoriesAction({ navigate }));
      } else if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_GetAllCategories_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Data available",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_GetAllCategories_02".toLowerCase()
              )
          ) {
            return rejectWithValue("No Data available");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_CommonManager_GetAllCategories_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);
