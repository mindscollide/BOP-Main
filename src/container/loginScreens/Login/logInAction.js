import {
  corporateUserRequestMethod,
  loginRequestMethod,
} from "@/common/api_config";
import { authApi } from "@/common/apiend_points";
import { roleBasedNavigation, setCustomHeaders } from "@/common/utils";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define the login async thunk
export const loginInApi = createAsyncThunk(
  "auth/login", // A unique action type string
  async ({ navigate, Data, shouldIsCorporate }, { rejectWithValue }) => {
    try {
      let getBlotterData = createPostAPI(
        authApi,
        loginRequestMethod.RequestMethod
      );

      const response = await getBlotterData(Data);
      if (response.data.responseCode === 200) {
        const { isExecuted, responseMessage, token, refreshToken } =
          response.data.responseResult;
        console.log(isExecuted, "messageKeymessageKey");

        if (isExecuted) {
          console.log(responseMessage, "responseMessage");

          switch (responseMessage.toLowerCase()) {
            case "ERM_AuthService_AuthManager_Login_01".toLowerCase():
            case "ERM_AuthService_AuthManager_Login_02".toLowerCase():
            case "ERM_AuthService_AuthManager_Login_04".toLowerCase():
            case "ERM_AuthService_AuthManager_Login_05".toLowerCase():
              return rejectWithValue("User is Locked")
            case "ERM_AuthService_AuthManager_Login_06".toLowerCase():
              return rejectWithValue("User is Disabled")
            case "ERM_AuthService_AuthManager_Login_07".toLowerCase():
              return rejectWithValue("User is Closed")
            case "ERM_AuthService_AuthManager_Login_08".toLowerCase():
              return rejectWithValue("User is Dormant")
            case "ERM_AuthService_AuthManager_Login_09".toLowerCase():
              return rejectWithValue("Login Failed")
            case "ERM_AuthService_AuthManager_Login_10".toLowerCase():
              return rejectWithValue("Login Failed")
            case "ERM_AuthService_AuthManager_Login_11".toLowerCase():
              return rejectWithValue("Someting went wrong")
            case "ERM_AuthService_AuthManager_Login_12".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Not A valid role to login");

            case "ERM_AuthService_AuthManager_Login_13".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Branch is InActive");

            case "ERM_AuthService_AuthManager_Login_03".toLowerCase():
              const {
                branch,
                employeeID,
                ldapAccount,
                userID,
                firstName,
                email,
                contactNumber,
                userRoleID,
                userStatusID,
              } = response.data.responseResult.user;

              localStorage.setItem("token", token);
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem("name", firstName);
              localStorage.setItem("email", email);
              localStorage.setItem("roleId", userRoleID);
              localStorage.setItem("userID", userID);
              localStorage.setItem("branch", JSON.stringify(branch));
              localStorage.setItem("employeeID", employeeID);
              localStorage.setItem("ldapAccount", ldapAccount);
              localStorage.setItem("contactNumber", contactNumber);
              localStorage.setItem("userStatusID", userStatusID);

              roleBasedNavigation(navigate, userRoleID);

              return {
                response: response.data.responseResult,
                message: "Successfully logged In",
              };

            default:
              console.log("", response.data);
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

// Define the login async thunk
export const corporateUserLoginInApi = createAsyncThunk(
  "auth/corporateLogIn", // A unique action type string
  async ({ navigate, Data }, { rejectWithValue }) => {
    try {
      let corporateUserLoginIn = createPostAPI(
        authApi,
        corporateUserRequestMethod.RequestMethod
      );

      const response = await corporateUserLoginIn(Data);
      if (response.data.responseCode === 200) {
        const {
          isExecuted,
          responseMessage,
          token,
          refreshToken,
        } = response.data.responseResult;

        if (isExecuted) {
          switch (responseMessage.toLowerCase()) {
            case "ERM_AuthService_AuthManager_CorporateUserLogin_01".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_02".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_04".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_05".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_06".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_07".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_08".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_09".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_10".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_11".toLowerCase():
            case "ERM_AuthService_AuthManager_CorporateUserLogin_12".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Something went wrong");

            case "ERM_AuthService_AuthManager_CorporateUserLogin_13".toLowerCase():
              console.log("", response.data);
              return rejectWithValue("Corporate is InActive");

            case "ERM_AuthService_AuthManager_CorporateUserLogin_03".toLowerCase():
              const {
                corporate,
                employeeID,
                ldapAccount,
                userID,
                firstName,
                email,
                contactNumber,
                userRoleID,
                userStatusID,
              } = response.data.responseResult.user;
              localStorage.setItem("token", token);
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem("name", firstName);
              localStorage.setItem("email", email);
              localStorage.setItem("roleId", userRoleID);
              localStorage.setItem("userID", userID);
              localStorage.setItem("corporate", JSON.stringify(corporate));
              localStorage.setItem("employeeID", employeeID);
              localStorage.setItem("ldapAccount", ldapAccount);
              localStorage.setItem("contactNumber", contactNumber);
              localStorage.setItem("userStatusID", userStatusID);

              roleBasedNavigation(navigate, userRoleID);
              return {
                response: response.data.responseResult,
                message: "Successfully logged In",
              };

            default:
              console.log("", response.data);
              return rejectWithValue("Something went wrong");
          }
        } else {
          console.log("", response.data);
          return rejectWithValue("Something went wrong");
        }
      }
    } catch (error) {
      // Reject with error message
      return rejectWithValue("Something went wrong");
    }
  }
);
