import {
  DownloadFileRM,
  UploadDocumentRM,
  getChatByTransactionIdRM,
  saveChatRM,
} from "@/common/api_config";
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
      const { responseCode } = response.data;

      if (responseCode === 417) {
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
            creationDateTime: formatDateToUTC(new Date()),
          };
          setTransactionChat((prev) => ({
            ...prev,
            getAllChat: [Data2, ...prev.getAllChat],
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

export const uploadDocumentApi = createAsyncThunk(
  "chat/uploadDocumentApi",
  async ({ Data, navigate }, { rejectWithValue, dispatch }) => {
    try {
      let uploadDocument = createPostAPI(
        chatApi,
        UploadDocumentRM.RequestMethod
      );
      const response = await uploadDocument(Data);
      const { responseCode } = response.data;

      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(uploadDocumentApi({ Data, navigate }));
      } else if (responseCode === 200) {
        const { isExecuted, responseMessage } = response.data.responseResult;
        if (!isExecuted) {
          return rejectWithValue(responseMessage);
        }

        if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_UploadDocuments_01".toLowerCase()
            )
        ) {
          return {
            response: response.data.responseResult,
            message: "File Uploaded Successfully",
          };
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_UploadDocuments_02".toLowerCase()
            )
        ) {
          return rejectWithValue("File Not Found");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_UploadDocuments_03".toLowerCase()
            )
        ) {
          return rejectWithValue("Something went wrong");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_UploadDocuments_04".toLowerCase()
            )
        ) {
          return rejectWithValue("File extension is not allowed");
        } else if (
          responseMessage
            .toLowerCase()
            .includes(
              "Chat_ChatServiceManager_UploadDocuments_05".toLowerCase()
            )
        ) {
          return rejectWithValue("File exceeds the 100MB Limit");
        } else {
          return rejectWithValue("Something went wrong");
        }
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const DownloadFileApi = createAsyncThunk(
  "chat/DownloadFile",
  async ({ Data }, { rejectWithValue }) => {
    try {
      let downloadFile = createPostAPI(chatApi, DownloadFileRM.RequestMethod);
      const response = await downloadFile(Data);
      const { responseCode } = response.data;
      if (responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        dispatch(uploadDocumentApi({ Data, navigate }));
      } else if (responseCode === 200) {
        return {
          response: response.data.responseResult,
          message: "File Downloaded Successfully",
        };
      } else if (responseCode === 400) {
        return rejectWithValue("File Not Found");
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
);
