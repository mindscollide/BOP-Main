import { DownloadFile } from "@/common/api_config";
import { reportApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the DownloadFileAPI async thunk
export const DownloadFileAPI = createAsyncThunk(
  "Report/DownloadFileData",
  async (
    { requestMethod, fileName = "download", fileType = "pdf", navigate },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const headers = {
        ...setCustomHeaders(),
        Accept: getMimeType(fileType),
      };

      const form = new FormData();
      form.append("RequestMethod", requestMethod);

      const response = await axios({
        method: "post",
        url: reportApi,
        data: form,
        headers,
        responseType: "blob", // Needed to handle file data
      });

      const contentDisposition = response.headers["content-disposition"];
      const extractedFileName =
        getFileNameFromHeader(contentDisposition) || `${fileName}.${fileType}`;

      // Create blob and download
      const blob = new Blob([response.data], { type: getMimeType(fileType) });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = extractedFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      return { message: "File downloaded successfully" };
    } catch (error) {
      console.error("Download error:", error);

      if (error.response?.status === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        return dispatch(
          DownloadFileAPI({ requestMethod, fileName, fileType, navigate })
        );
      }

      return rejectWithValue("File download failed");
    }
  }
);
