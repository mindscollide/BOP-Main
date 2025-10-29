import {
  GetFeDiscountingRM,
  PublishFeDiscountingRM,
} from "@/common/api_config";
import { watchListApi } from "@/common/apiend_points";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetFEDiscountingTableApi = createAsyncThunk(
  "uploadRates/GetFeDiscounting",
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      const getFeDiscounting = createPostAPI(
        watchListApi,
        GetFeDiscountingRM.RequestMethod
      );
      const response = await getFeDiscounting();
      console.log(response.data.responseCode, "result");
      const { responseCode } = response.data;
      console.log(responseCode, "result");

      if (responseCode === 200) {
        console.log(response, "result");

        const { isExecuted, responseMessage } = response.data.responseResult;
        if (!isExecuted) {
          console.log(response, "result");

          return rejectWithValue("Something went wrong");
        }
        if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_GetFEDiscountingRates_01".toLowerCase()
            )
        ) {
          return {
            response: response.data.responseResult,
            message: "Fe Discounting Published Data Successfully",
          };
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

export const PublishFEDiscountingTableApi = createAsyncThunk(
  "uploadRates/PublishFeDiscounting",
  async ({ Data, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const publishFeDiscounting = createPostAPI(
        watchListApi,
        PublishFeDiscountingRM.RequestMethod
      );
      const response = await publishFeDiscounting(Data);
      console.log(response, "result");
      const { responseCode } = response.data;

      if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (!isExecuted) {
          return rejectWithValue("Something went wrong");
        }
        if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishFEDiscountingRates_01".toLowerCase()
            )
        ) {
          return {
            response: null,
            message: "FE Discounting Rates Publish Successfully",
          };
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishFEDiscountingRates_02".toLowerCase()
            )
        ) {
          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishFEDiscountingRates_03".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishFEDiscountingRates_04".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "UploadRate_UploadRateServiceManager_PublishFEDiscountingRates_05".toLowerCase()
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
