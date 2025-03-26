import { setCustomHeaders } from "@/common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import { GetAllCounterPartyDataRM } from "@/common/api_config";

export const getAllCategoryTableData = createAsyncThunk(
  "category/getAllCategoryTableData",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const headers = setCustomHeaders();
   
      let form = new FormData();
      form.append("RequestMethod", GetAllCounterPartyDataRM.RequestMethod);
      form.append("RequestData", JSON.stringify(Data));
      const response = await axios({
        method: "post",
        url: categoryApi,
        data: form,
        headers,
      });

      const { responseCode } = response.data;
  
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTheLastAndCurrentPublishUSDRates_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_GetTheLastAndCurrentPublishUSDRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTheLastAndCurrentPublishUSDRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTheLastAndCurrentPublishUSDRates_04".toLowerCase()
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
        return rejectWithValue("Something went wrong")
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
