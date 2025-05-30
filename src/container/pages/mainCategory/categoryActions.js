import { setCustomHeaders } from "@/common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import { GetAllCounterPartyDataRM } from "@/common/api_config";
import { watchListApi } from "@/common/apiend_points";

export const getAllCategoryTableData = createAsyncThunk(
  "category/getAllCategoryTableData",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      let getAllCategoryTable = createPostAPI(
        watchListApi,
        GetAllCounterPartyDataRM.RequestMethod
      );

      const response = await getAllCategoryTable(Data);
      const { responseCode } = response.data;
      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getAllCategoryTableData({ navigate, Data }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllCounterPartyData_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Successfull",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllCounterPartyData_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllCounterPartyData_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "WatchList_WatchListServiceManager_GetAllCounterPartyData_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            console.log("", response.data);
            return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
