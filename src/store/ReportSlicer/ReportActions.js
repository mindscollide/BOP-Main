import {
  DownloadExcelReportBlotterTrasactionBranch,
  DownloadExcelReportBlotterTrasactionCorporate,
  DownloadExcelReportBlotterTrasactionTreasury,
  DownloadFile,
  DownloadPDFReportBlotterTrasactionBranch,
  DownloadPDFReportBlotterTrasactionCorporate,
  DownloadPDFReportBlotterTrasactionTreasury,
} from "@/common/api_config";
import { reportApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import createPostAPI from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

//Excel Report Function Branch
export const DownloadExcelReportBlotterTrasactionBranchAPI = createAsyncThunk(
  "Report/DownloadExcelReportBlotterTrasactionBranchAPI",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        reportApi,
        DownloadExcelReportBlotterTrasactionBranch.RequestMethod
      );

      const response = await getTransactionData(Data, true);
      console.log(response, "errorerrorerrorerror");

      // 🚨 Ensure response is valid before trying to read Excel blob
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "BlotterTransactionBranch.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "Excel downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading Excel");
      }
    } catch (error) {
      console.log("Excel Download Error:", error);
      if (error?.responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      console.log(error, "errorerrorerrorerror");
      console.log(error?.responseCode, "errorerrorerrorerror");
      if (error?.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        return;
      }

      return rejectWithValue("Something went wrong while downloading Excel");
    }
  }
);

//Excel Report Function Corporate
export const DownloadExcelReportBlotterTrasactionCorporateAPI =
  createAsyncThunk(
    "Report/DownloadExcelReportBlotterTrasactionCorporateAPI",
    async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
      try {
        const getTransactionData = createPostAPI(
          reportApi,
          DownloadExcelReportBlotterTrasactionCorporate.RequestMethod
        );

        const response = await getTransactionData(Data, true);
        console.log(response, "errorerrorerrorerror");

        // 🚨 Ensure response is valid before trying to read Excel blob
        if (response?.status === 200) {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "BlotterTransactionCorporate.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          return { message: "Excel downloaded successfully" };
        } else {
          return rejectWithValue(
            "Something went wrong while downloading Excel"
          );
        }
      } catch (error) {
        console.log("Excel Download Error:", error);
        if (error?.responseCode === 401) {
          navigate("/");
          return rejectWithValue("Unauthorized access, please login again");
        }
        console.log(error, "errorerrorerrorerror");
        console.log(error?.responseCode, "errorerrorerrorerror");
        if (error?.responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));
          return;
        }

        return rejectWithValue("Something went wrong while downloading Excel");
      }
    }
  );

//Excel Report Function Treasury
export const DownloadExcelReportBlotterTrasactionTreasuryAPI = createAsyncThunk(
  "Report/DownloadExcelReportBlotterTrasactionTreasuryAPI",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        reportApi,
        DownloadExcelReportBlotterTrasactionTreasury.RequestMethod
      );

      const response = await getTransactionData(Data, true);
      console.log(response, "errorerrorerrorerror");

      // 🚨 Ensure response is valid before trying to read Excel blob
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "BlotterTransactionTreasury.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "Excel downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading Excel");
      }
    } catch (error) {
      console.log("Excel Download Error:", error);
      if (error?.responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }
      console.log(error, "errorerrorerrorerror");
      console.log(error?.responseCode, "errorerrorerrorerror");
      if (error?.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        return;
      }

      return rejectWithValue("Something went wrong while downloading Excel");
    }
  }
);

// PDF Report Function Branch
export const DownloadPDFReportBlotterTrasactionBranchAPI = createAsyncThunk(
  "Report/DownloadPDFReportBlotterTrasactionBranchAPI",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        reportApi,
        DownloadPDFReportBlotterTrasactionBranch.RequestMethod
      );

      const response = await getTransactionData(Data, true);
      console.log(response, "responseresponse")
      // 🟢 PDF file response
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "TransactionDetailsByBranch.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "PDF downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading PDF");
      }
    } catch (error) {
      console.log("PDF Download Error:", error);
      if (error?.responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }

      if (error?.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        return;
      }

      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);

// PDF Report Function Corporate
export const DownloadPDFReportBlotterTrasactionCorporateAPI = createAsyncThunk(
  "Report/DownloadPDFReportBlotterTrasactionCorporateAPI",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        reportApi,
        DownloadPDFReportBlotterTrasactionCorporate.RequestMethod
      );

      const response = await getTransactionData(Data, true);

      // 🟢 PDF file response
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "TransactionDetailsByCorporate.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "PDF downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading PDF");
      }
    } catch (error) {
      console.log("PDF Download Error:", error);
      if (error?.responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }

      if (error?.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        return;
      }

      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);

// PDF Report Function Treasury
export const DownloadPDFReportBlotterTrasactionTreasuryAPI = createAsyncThunk(
  "Report/DownloadPDFReportBlotterTrasactionTreasuryAPI",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        reportApi,
        DownloadPDFReportBlotterTrasactionTreasury.RequestMethod
      );

      const response = await getTransactionData(Data, true);

      // 🟢 PDF file response
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "TransactionDetailsByTreasury.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { message: "PDF downloaded successfully" };
      } else {
        return rejectWithValue("Something went wrong while downloading PDF");
      }
    } catch (error) {
      console.log("PDF Download Error:", error);
      if (error?.responseCode === 401) {
        navigate("/");
        return rejectWithValue("Unauthorized access, please login again");
      }

      if (error?.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));
        return;
      }

      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);
