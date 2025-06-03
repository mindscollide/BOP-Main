import {
  GetNonFeDiscountingRatesRM,
  PublishNonFeDiscountingRatesRM,
} from "@/common/api_config";
import { uploadRatesApi } from "@/common/apiend_points";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetNonFEDiscountingTableApi = createAsyncThunk(
  "uploadRates/GetNonFeDiscounting",
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      const getFeDiscounting = createPostAPI(
        uploadRatesApi,
        GetNonFeDiscountingRatesRM.RequestMethod
      );
      const response = await getFeDiscounting();
      console.log(response, "result");
      const { responseCode } = response.data;
      console.log(responseCode, "result");
      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        console.log(response, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(GetNonFEDiscountingTableApi({ navigate }));
      } else if (responseCode === 200) {
        console.log(response, "result");

        const { isExecuted, responseMessage } = response.data.responseResult;
        if (!isExecuted) {
          console.log(response, "result");

          return rejectWithValue(responseMessage);
        }
        if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_GetNonFEDiscountingRates_01".toLowerCase()
            )
        ) {
          return {
            response: response.data.responseResult,
            message: "Get Non Fe Discounting Data",
          };
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_GetNonFEDiscountingRates_02".toLowerCase()
            )
        ) {
          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_GetNonFEDiscountingRates_03".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_GetNonFEDiscountingRates_04".toLowerCase()
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

export const PublishNonFEDiscountingTableApi = createAsyncThunk(
  "uploadRates/PublishNonFeDiscounting",
  async ({ Data, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const publishFeDiscounting = createPostAPI(
        uploadRatesApi,
        PublishNonFeDiscountingRatesRM.RequestMethod
      );
      const response = await publishFeDiscounting(Data);
      console.log(response, "result");
      const { responseCode } = response.data;
      if (responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      if (responseCode === 417) {
        console.log(response, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(PublishNonFEDiscountingTableApi({ Data, navigate }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.responseResult;
        if (!isExecuted) {
          return rejectWithValue(responseMessage);
        }
        if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishNonFEDiscountingRates_01".toLowerCase()
            )
        ) {
          return {
            response: response.data.responseResult,
            message: "Publish Non Discounting Rates Published Successfully",
          };
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishNonFEDiscountingRates_02".toLowerCase()
            )
        ) {
          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishNonFEDiscountingRates_03".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishNonFEDiscountingRates_04".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishNonFEDiscountingRates_05".toLowerCase()
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
      console.log("Error publishing FE discounting data:", error);
      return rejectWithValue("Something went wrong");
    }
  }
);
