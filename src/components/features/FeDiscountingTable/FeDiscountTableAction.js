import { GetFeDiscountingRM } from "@/common/api_config";
import { uploadRatesApi } from "@/common/apiend_points";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetFEDiscountingTableApi = createAsyncThunk(
  "uploadRates/GetFeDiscounting",
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      const getFeDiscounting = createPostAPI(
        uploadRatesApi,
        GetFeDiscountingRM.RequestMethod
      );
      const response = await getFeDiscounting();
      console.log(response, "result");
      const { responseCode } = response;
      console.log(responseCode, "result");
      if (responseCode === 401) {
        navigate("/");
      }
      if (responseCode === 417) {
        console.log(response, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetFEDiscountingTableApi({ navigate }));
      } else if (responseCode === 200) {
        console.log(response, "result");

        const { isExecuted, responseMessage } = response.responseResult;
        if (!isExecuted) {
          console.log(response, "result");

          return rejectWithValue(responseMessage);
        }
        if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_GetFEDiscountingRates_01".toLowerCase()
            )
        ) {
          return response.data.responseResult;
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_GetFEDiscountingRates_02".toLowerCase()
            )
        ) {
          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_GetFEDiscountingRates_03".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_GetFEDiscountingRates_04".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else {
          return rejectWithValue("Someting went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching FE discounting data:", error);
      return rejectWithValue("Something went wrong");
    }
  }
);
