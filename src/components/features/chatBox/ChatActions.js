import { getChatByTransactionIdRM } from "@/common/api_config";
import { chatApi } from "@/common/apiend_points";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllChatByTransactionId = createAsyncThunk(
  "chat/getAllUserChatByTransactionId",
  async (
    { navigate, Data, setChatModal, setChatModalTransactionId },
    { rejectWithValue, dispatch }
  ) => {
    try {
      let getUserChat = createPostAPI(
        chatApi,
        getChatByTransactionIdRM.RequestMethod
      );
      const result = await getUserChat(Data);
      console.log(result, "result");
      const { responseCode } = result;
      if (responseCode === 417) {
        console.log(result, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(
          getAllChatByTransactionId({
            navigate,
            Data,
            setChatModal,
            setChatModalTransactionId,
          })
        );
      } else if (responseCode === 200) {
        console.log(result, "result");

        const { isExecuted, responseMessage } = result.responseResult;
        if (!isExecuted) {
          console.log(result, "result");

          return rejectWithValue(responseMessage);
        }
        console.log(result, "result");

        if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_GetAllChatByTransactionID_01".toLowerCase()
            )
        ) {
          setChatModal(true);
          setChatModalTransactionId(Data.TranscationID);
          return {
            response: result.responseResult,
            message: "Data Found",
          };
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_GetAllChatByTransactionID_02".toLowerCase()
            )
        ) {
          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_GetAllChatByTransactionID_03".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_GetAllChatByTransactionID_04".toLowerCase()
            )
        ) {
          return rejectWithValue("Someting went wrong");
        } else {
          return rejectWithValue("Someting went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {}
  }
);
