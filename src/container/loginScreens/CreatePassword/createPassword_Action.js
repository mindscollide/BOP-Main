import { roleBasedNavigation, setCustomHeaders } from "@/common/utils";
import { authApi } from "@/common/apiend_points";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  validateLinkForCorporatePasswordRM,
  createCorporateUserPasswordRM,
} from "@/common/api_config";

// Define the login async thunk
export const validateLinkForCorporateCreatePasswordApi = createAsyncThunk(
  "auth/validatedCreatePasswordLink", // A unique action type string
  async ({ validateValue }, { rejectWithValue }) => {
    let Data = {
      EncryptedString: validateValue,
    };
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append(
        "RequestMethod",
        validateLinkForCorporatePasswordRM.RequestMethod
      );

      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: authApi,
        data: form,
        headers, // Use custom headers here
      });

      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        console.log(responseMessage, "responseMessageresponseMessage");
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ValidateLinkForCorporatePassword_01".toLowerCase()
              )
          ) {
            return {
              response: response.data.responseResult,
              message: "Email for Reset Password Sent Successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ValidateLinkForCorporatePassword_02".toLowerCase()
              )
          ) {
            return rejectWithValue("No Emailsent for Reset Password");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_ValidateLinkForCorporatePassword_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Corporate User");
          } else {
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          return rejectWithValue("Something-went-wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something-went-wrong");
    }
  }
);

export const createCorporateCreatePasswordApi = createAsyncThunk(
  "auth/createPasswordCorporate", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      // Set Axios headers using your custom headers function
      const headers = setCustomHeaders();

      //   This is the FormData
      let form = new FormData();

      form.append("RequestMethod", createCorporateUserPasswordRM.RequestMethod);

      form.append("RequestData", JSON.stringify(Data));

      // Make the API request with custom headers
      const response = await axios({
        method: "post",
        url: authApi,
        data: form,
        headers, // Use custom headers here
      });

      if (response.data.responseCode === 200) {
        const {
          isExecuted,
          responseMessage,
          roleID,
          userID,
          token,
          userName,
          firstName,
          lastName,
          refreshToken,
          corporateID,
        } = response.data.responseResult;
        console.log(
          responseMessage,
          isExecuted,
          "responseMessageresponseMessage"
        );
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CreateCorporateUserPassword_01".toLowerCase()
              )
          ) {
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("token", token);
            roleBasedNavigation(navigate, roleID);
            return {
              response: response.data.responseResult,
              message: "Successfully Created",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CreateCorporateUserPassword_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Email");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CreateCorporateUserPassword_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Invalid Corporate User");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CreateCorporateUserPassword_04".toLowerCase()
              )
          ) {
            return rejectWithValue("User is InActive");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CreateCorporateUserPassword_05".toLowerCase()
              )
          ) {
            return rejectWithValue("Error while creating password");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_CreateCorporateUserPassword_06".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else {
            return rejectWithValue("Something-went-wrong");
          }
        } else {
          return rejectWithValue("Something-went-wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something-went-wrong");
    }
  }
);
