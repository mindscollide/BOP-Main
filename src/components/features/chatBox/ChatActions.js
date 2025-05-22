import { getChatByTransactionIdRM, saveChatRM } from "@/common/api_config";
import { chatApi } from "@/common/apiend_points";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
import createPostAPI from "@/utils/axiosInstance";
import { formatDateToUTC } from "@/utils/formatters";
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
      const response = await getUserChat(Data);
      console.log(response, "result");
      const { responseCode } = response.data;
      console.log(responseCode, "result");

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
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (!isExecuted) {
          return rejectWithValue(responseMessage);
        }

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
            response: response.data.responseResult,
            message: "Data Found",
          };
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_GetAllChatByTransactionID_02".toLowerCase()
            )
        ) {
          setChatModal(true);
          setChatModalTransactionId(Data.TranscationID);
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
      } else if (responseCode === 400) {
        return rejectWithValue("Something went wrong");
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const saveChatApi = createAsyncThunk(
  "chat/saveChatApi",
  async (
    { navigate, Data, setTransactionChat, setMessage },
    { rejectWithValue, dispatch }
  ) => {
    try {
      let getUserChat = createPostAPI(chatApi, saveChatRM.RequestMethod);
      const response = await getUserChat(Data);
      const { responseCode } = response.data;
      if (responseCode === 417) {
        console.log(result, "result");

        await dispatch(refreshTokenAction({ navigate }));
        dispatch(
          saveChatApi({
            navigate,
            Data,
            setTransactionChat,
            setMessage,
          })
        );
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (!isExecuted) {
          return rejectWithValue(responseMessage);
        }

        if (
          responseMessage
            .toLowerCase()
            .includes("Chat_ChatServiceManager_SaveChat_01".toLowerCase())
        ) {
          let Data2 = {
            chatMessageID: response.data.responseResult.chatMessageID,
            receiverID: 1,
            senderID: 149,
            message: Data.Message,
            attachments: Data.Attachments,
            creationDateTime: formatDateToUTC(new Date())
          };
          setTransactionChat((prev) => ({
            ...prev,
            getAllChat: [...prev.getAllChat, Data2],
          }));
          setMessage("");
          return {
            response: response.data.responseResult,
            message: "Data Found",
          };
        } else if (
          responseMessage
            .toLowerCase()
            .includes("Chat_ChatServiceManager_SaveChat_02".toLowerCase())
        ) {
          return rejectWithValue("No Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes("Chat_ChatServiceManager_SaveChat_03".toLowerCase())
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes("Chat_ChatServiceManager_SaveChat_04".toLowerCase())
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes("Chat_ChatServiceManager_SaveChat_05".toLowerCase())
        ) {
          return rejectWithValue("Someting went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes("Chat_ChatServiceManager_SaveChat_06".toLowerCase())
        ) {
          return rejectWithValue("Someting went wrong");
        } else {
          return rejectWithValue("Someting went wrong");
        }
      } else if (responseCode === 400) {
        return rejectWithValue("Something went wrong");
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
);
