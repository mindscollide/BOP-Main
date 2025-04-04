import { setCustomHeaders } from "@/common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadRatesApi } from "@/common/apiend_points";
import {
  clearRatesRM,
  marketOnOffRM,
  getLastAndCurrentUSDRatesRM,
  publishCurrentUSDRatesRM,
  createTenorRM,
  getAllTenorsRM,
  getTenorWiseForwardRatesRM,
  publishTenorWiseForwardRatesRM,
  getDiscountingRatesRM,
  publishDiscountingRatesRM,
} from "@/common/api_config";
import axios from "axios";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";

// Define the login async thunk
export const clearRatesAction = createAsyncThunk(
  "uploadRate/clearRate", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", clearRatesRM.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      const { isExecuted, responseMessage } = response.data.responseResult;
      if (responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_ClearRates_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_ClearRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_ClearRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_ClearRates_04".toLowerCase()
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
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the login async thunk
export const getLastPublishRatesAction = createAsyncThunk(
  "uploadRate/getLastPublishRates", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", getLastAndCurrentUSDRatesRM.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
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
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the login async thunk
export const PublishNewRatesAction = createAsyncThunk(
  "uploadRate/PublishNewRates", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", publishCurrentUSDRatesRM.RequestMethod);
      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      const { isExecuted, responseMessage } = response.data.responseResult;
      if (responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Rates are published",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTheCurrentUSDRates_05".toLowerCase()
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
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the login async thunk
export const marketOnOffAction = createAsyncThunk(
  "uploadRate/marketOnOff", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", marketOnOffRM.RequestMethod);
      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      const { isExecuted, responseMessage } = response.data.responseResult;
      if (responseCode === 417) {
      } else if (response.data.responseCode === 200) {
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_MarketONOFF_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_MarketONOFF_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_MarketONOFF_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_MarketONOFF_04".toLowerCase()
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
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the login async thunk
export const getAllTenorsAction = createAsyncThunk(
  "uploadRate/getAllTenors", // A unique action type string
  async ({}, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", getAllTenorsRM.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      if (responseCode === 417) {
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetAllTenors_01".toLowerCase()
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
                "UploadRate_UploadRateServiceManager_GetAllTenors_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetAllTenors_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetAllTenors_04".toLowerCase()
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
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the login async thunk
export const createTenorAction = createAsyncThunk(
  "uploadRate/createTenors", // A unique action type string
  async (
    { navigate, Data, setCreateTenorModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", createTenorRM.RequestMethod);
      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(createTenorAction(navigate, Data, setCreateTenorModal));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_01".toLowerCase()
              )
          ) {
            setCreateTenorModal(false);
            return {
              response: response.data.responseResult,
              message: "Tenor has been created successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_CreateTenor_05".toLowerCase()
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
        return rejectWithValue(error.response.data);
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the login async thunk
export const getTenorWiseForwardsAction = createAsyncThunk(
  "uploadRate/getTenorWiseForward", // A unique action type string
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();
      console.log("Checking");
      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", getTenorWiseForwardRatesRM.RequestMethod);
      // form.append("RequestData", JSON.stringify(Data));
      console.log("Checking", form);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getTenorWiseForwardsAction({ navigate }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTenorWiseForwardRates_01".toLowerCase()
              )
          ) {
            let newData = {
              responseResult: {
                currentTenorWiseForwardRates: [
                  {
                    tenorID: 1,
                    bid: 1.25,
                    ask: 1.3,
                    dateTime: "20240808143452",
                  },
                  {
                    tenorID: 2,
                    bid: 1.35,
                    ask: 1.4,
                    dateTime: "20240808143452",
                  },
                  {
                    tenorID: 3,
                    bid: 1.45,
                    ask: 1.5,
                    dateTime: "20240808143452",
                  },
                ],
                lastTenorWiseForwardRates: [
                  {
                    tenorID: 1,
                    bid: 1.2,
                    ask: 1.25,
                    dateTime: "20240808143452",
                  },
                  {
                    tenorID: 2,
                    bid: 1.3,
                    ask: 1.35,
                    dateTime: "20240808143452",
                  },
                  {
                    tenorID: 3,
                    bid: 1.4,
                    ask: 1.45,
                    dateTime: "20240808143452",
                  },
                ],
                responseMessage:
                  "UploadRate_UploadRateServiceManager_GetTenorWiseForwardRates_01",
                isExecuted: true,
              },
            };
            return {
              response: response.data.responseResult,
              message: "Successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTenorWiseForwardRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTenorWiseForwardRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetTenorWiseForwardRates_04".toLowerCase()
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
        return rejectWithValue(error.response.data);
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);
// Define the login async thunk
export const PublishTenorWiseForwardsAction = createAsyncThunk(
  "uploadRate/publishTenorWiseForward", // A unique action type string
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();
      console.log("Checking");
      //   This is the FormData
      let form = new FormData();

      form.append(
        "RequestMethod",
        publishTenorWiseForwardRatesRM.RequestMethod
      );
      form.append("RequestData", JSON.stringify(Data));
      console.log("Checking", form);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(createTenorAction({ navigate }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Forwards Rates are Published",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_04".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_PublishTenorWiseForwardRates_05".toLowerCase()
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
        return rejectWithValue(error.response.data);
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDiscountingRatesAction = createAsyncThunk(
  "uploadRate/getDiscountingRates",
  async ({ navigate }, { dispatch, rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", getDiscountingRatesRM.RequestMethod);

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: uploadRatesApi,
        data: form,
        headers, // Use custom headers here
      });

      const { responseCode } = response.data;

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(getDiscountingRatesAction({ navigate }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDiscountingRates_01".toLowerCase()
              )
          ) {
            let response = {
              previousRates: [
                {
                  instumentID: 21,
                  instrumentName: "USD",
                  rate: 2.75,
                  dateTime: "20240822081901",
                },
                {
                  instumentID: 22,
                  instrumentName: "EUR",
                  rate: 3.5,
                  dateTime: "20240822081901",
                },
                {
                  instumentID: 23,
                  instrumentName: "GBP",
                  rate: 1.9,
                  dateTime: "20240822081901",
                },
              ],
              currentRates: [
                {
                  instumentID: 21,
                  instrumentName: "USD",
                  rate: 2.75,
                  dateTime: "20240822081918",
                },
                {
                  instumentID: 22,
                  instrumentName: "EUR",
                  rate: 3.5,
                  dateTime: "20240822081918",
                },
                {
                  instumentID: 23,
                  instrumentName: "GBP",
                  rate: 1.9,
                  dateTime: "20240822081918",
                },
              ],
              responseMessage:
                "UploadRate_UploadRateServiceManager_GetDiscountingRates_01",
              isExecuted: true,
            };
            return {
              response: response.data.responseResult,
              message: "Forwards Rates are Published",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDiscountingRates_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDiscountingRates_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "UploadRate_UploadRateServiceManager_GetDiscountingRates_04".toLowerCase()
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
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);

export const publishDiscountingRatesAction = createAsyncThunk(
  "uploadRate/publishDiscountingRates",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      try {
        // Set Axios headers using your custom headers function
        const headers = setCustomHeaders();
        console.log("Checking");
        //   This is the FormData
        let form = new FormData();

        form.append(
          "RequestMethod",
          publishTenorWiseForwardRatesRM.RequestMethod
        );
        form.append("RequestData", JSON.stringify(Data));
        console.log("Checking", form);

        // Make the API request with custom headers
        const response = await axios({
          method: "post",
          url: uploadRatesApi,
          data: form,
          headers, // Use custom headers here
        });

        const { responseCode } = response.data;

        if (responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));
          dispatch(createTenorAction({ navigate }));
        } else if (responseCode === 200) {
          const { isExecuted, responseMessage } = response.data.responseResult;
          if (isExecuted) {
            if (
              responseMessage
                .toLowerCase()
                .includes(
                  "UploadRate_UploadRateServiceManager_PublishDiscountingRates_01".toLowerCase()
                )
            ) {
              return {
                response: response.data.responseResult,
                message: "Successfully",
              };
            } else if (
              responseMessage
                .toLowerCase()
                .includes(
                  "UploadRate_UploadRateServiceManager_PublishDiscountingRates_02".toLowerCase()
                )
            ) {
              return rejectWithValue("Something went wrong");
            } else if (
              responseMessage
                .toLowerCase()
                .includes(
                  "UploadRate_UploadRateServiceManager_PublishDiscountingRates_03".toLowerCase()
                )
            ) {
              return rejectWithValue("Something went wrong");
            } else if (
              responseMessage
                .toLowerCase()
                .includes(
                  "UploadRate_UploadRateServiceManager_PublishDiscountingRates_04".toLowerCase()
                )
            ) {
              return rejectWithValue("Something went wrong");
            } else if (
              responseMessage
                .toLowerCase()
                .includes(
                  "UploadRate_UploadRateServiceManager_PublishDiscountingRates_05".toLowerCase()
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
          return rejectWithValue(error.response.data);
        }
      } catch (error) {
        console.log(error);
        // Reject with error message
        return rejectWithValue(error.response.data);
      }
    } catch (error) {
      console.log(error);
      // Reject with error message
      return rejectWithValue(error.response.data);
    }
  }
);
