import {
  DownloadExcelReportBlotterTrasactionBranch,
  DownloadExcelReportBlotterTrasactionCorporate,
  DownloadExcelReportBlotterTrasactionTreasury,
  DownloadFile,
  DownloadPDFReportBlotterTrasactionBranch,
  DownloadPDFReportBlotterTrasactionCorporate,
  DownloadPDFReportBlotterTrasactionTreasury,
  EmailBlotterTransactionDetailsForTreasury,
  EmailBlotterTransactionDetailsForBranch,
  EmailBlotterTransactionDetailsForCorporate,
  NOPCalcuationReports,
} from "@/common/api_config";
import { reportApi } from "@/common/apiend_points";
import { setCustomHeaders } from "@/common/utils";
import { refreshTokenAction } from "@/container/loginScreens/authActions/refreshToken";
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
        await dispatch(refreshTokenAction({ navigate }));return
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
      const contentType = response.headers?.["content-type"];

      // 🟡 If backend sent JSON in arraybuffer, decode and check for token issues
      if (contentType && contentType.includes("application/json")) {
        const decodedString = new TextDecoder().decode(
          new Uint8Array(response.data)
        );
        const parsedData = JSON.parse(decodedString);

        if (parsedData.responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));return
          await dispatch(
            DownloadExcelReportBlotterTrasactionBranchAPI({ navigate, Data })
          );
          return;
        }

        return rejectWithValue(parsedData.message || "Something went wrong");
      }

      // 🟢 If it's a valid Excel file
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
        const contentType = response.headers?.["content-type"];

        // 🟡 Handle JSON error inside arraybuffer
        if (contentType && contentType.includes("application/json")) {
          const decodedString = new TextDecoder().decode(
            new Uint8Array(response.data)
          );
          const parsedData = JSON.parse(decodedString);

          if (parsedData.responseCode === 417) {
            await dispatch(refreshTokenAction({ navigate }));return
            await dispatch(
              DownloadExcelReportBlotterTrasactionCorporateAPI({
                navigate,
                Data,
              })
            );
            return;
          }

          return rejectWithValue(parsedData.message || "Something went wrong");
        }

        // 🟢 Valid Excel download
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
      const contentType = response.headers?.["content-type"];

      // 🟡 Check if response contains a JSON error inside arraybuffer
      if (contentType && contentType.includes("application/json")) {
        const decodedString = new TextDecoder().decode(
          new Uint8Array(response.data)
        );
        const parsedData = JSON.parse(decodedString);

        if (parsedData.responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));return
          await dispatch(
            DownloadExcelReportBlotterTrasactionTreasuryAPI({ navigate, Data })
          );
          return;
        }

        return rejectWithValue(parsedData.message || "Something went wrong");
      }

      // 🟢 Handle valid Excel file
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
      const contentType = response.headers?.["content-type"];

      // 🟡 Handle token-expired or error response inside arraybuffer
      if (contentType && contentType.includes("application/json")) {
        const decodedString = new TextDecoder().decode(
          new Uint8Array(response.data)
        );
        const parsedData = JSON.parse(decodedString);

        if (parsedData.responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));return
          await dispatch(
            DownloadPDFReportBlotterTrasactionBranchAPI({ navigate, Data })
          );
          return;
        }

        return rejectWithValue(parsedData.message || "Something went wrong");
      }

      // 🟢 Handle valid PDF response
      if (response?.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
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

      const contentType = response.headers?.["content-type"];

      // 🟡 Handle JSON error wrapped in arraybuffer
      if (contentType && contentType.includes("application/json")) {
        const decodedString = new TextDecoder().decode(
          new Uint8Array(response.data)
        );
        const parsedData = JSON.parse(decodedString);

        if (parsedData.responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));return
          await dispatch(
            DownloadPDFReportBlotterTrasactionCorporateAPI({ navigate, Data })
          );
          return;
        }

        return rejectWithValue(parsedData.message || "Something went wrong");
      }

      // 🟢 Handle successful PDF response
      if (response?.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
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

      const contentType = response.headers?.["content-type"];

      // 🟡 If the response is a JSON error wrapped in arraybuffer
      if (contentType && contentType.includes("application/json")) {
        const decodedString = new TextDecoder().decode(
          new Uint8Array(response.data)
        );
        const parsedData = JSON.parse(decodedString);
        console.log(parsedData, "parsedDataparsedDataparsedData");
        if (parsedData.responseCode === 417) {
          console.log(
            parsedData.responseCode,
            "parsedDataparsedDataparsedData"
          );
          await dispatch(refreshTokenAction({ navigate }));return
          await dispatch(
            DownloadPDFReportBlotterTrasactionTreasuryAPI({ navigate, Data })
          );
          return;
        }

        return rejectWithValue(parsedData.message || "Something went wrong");
      }

      // 🟢 Handle valid PDF response
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
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

      return rejectWithValue("Something went wrong while downloading PDF");
    }
  }
);

//Excel Report Function Treasury
export const DownloadExcelReportNOPCalculationsAPI = createAsyncThunk(
  "Report/DownloadExcelReportNOPCalculationsAPI",
  async ({ navigate, Data }, { dispatch, rejectWithValue }) => {
    try {
      const getTransactionData = createPostAPI(
        reportApi,
        NOPCalcuationReports.RequestMethod
      );

      const response = await getTransactionData(Data, true);
      const contentType = response.headers?.["content-type"];

      // 🟡 Check if response contains a JSON error inside arraybuffer
      if (contentType && contentType.includes("application/json")) {
        const decodedString = new TextDecoder().decode(
          new Uint8Array(response.data)
        );
        const parsedData = JSON.parse(decodedString);

        if (parsedData.responseCode === 417) {
          await dispatch(refreshTokenAction({ navigate }));return
          await dispatch(
            DownloadExcelReportNOPCalculationsAPI({ navigate, Data })
          );
          return;
        }

        return rejectWithValue(parsedData.message || "Something went wrong");
      }

      // 🟢 Handle valid Excel file
      if (response?.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "NOPCalculations.xlsx");
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

      return rejectWithValue("Something went wrong while downloading Excel");
    }
  }
);

// Email Report Function Branch
export const EmailBlotterTransactionDetailsForBranchAPI = createAsyncThunk(
  "Report/EmailBlotterTransactionDetailsForBranch", // A unique action type string
  async (
    { Data, navigate, setOpenMailModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      let EmailBlotterTransactionDetailsForBranchData = createPostAPI(
        reportApi,
        EmailBlotterTransactionDetailsForBranch.RequestMethod
      );

      const response = await EmailBlotterTransactionDetailsForBranchData(Data);
      console.log(response, "EmailBlotterTransactionDetailsForBranchResponse");
      const { data, status } = response;
      if (data?.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));return
        dispatch(
          EmailBlotterTransactionDetailsForBranchAPI({
            Data,
            navigate,
            setOpenMailModal,
          })
        );
      }
      if (status === 200) {
        const { isExecuted, responseMessage } = data;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForBranch_01".toLowerCase()
              )
          ) {
            setOpenMailModal(false);
            console.log("Email Sent Successfully");
            return {
              response: null,
              message: "Email Sent Successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForBranch_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForBranch_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForBranch_04".toLowerCase()
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
        console.log("", response.data);
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Email Report Function Branch
export const EmailBlotterTransactionDetailsForCorporateAPI = createAsyncThunk(
  "Report/EmailBlotterTransactionDetailsForCorporate", // A unique action type string
  async (
    { Data, navigate, setOpenMailModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      let EmailBlotterTransactionDetailsForCorporateData = createPostAPI(
        reportApi,
        EmailBlotterTransactionDetailsForCorporate.RequestMethod
      );

      const response = await EmailBlotterTransactionDetailsForCorporateData(
        Data
      );
      console.log(response, "EmailBlotterTransactionDetailsForCorporate");
      const { data, status } = response;
      if (data?.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));return
        dispatch(
          EmailBlotterTransactionDetailsForCorporateAPI({
            Data,
            navigate,
            setOpenMailModal,
          })
        );
      }
      if (status === 200) {
        const { isExecuted, responseMessage } = data;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForCorporate_01".toLowerCase()
              )
          ) {
            setOpenMailModal(false);
            console.log("Email Sent Successfully");
            return {
              response: null,
              message: "Email Sent Successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForCorporate_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForCorporate_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForCorporate_04".toLowerCase()
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
        console.log("", response.data);
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Email Report Function Branch
export const EmailBlotterTransactionDetailsForTreasuryAPI = createAsyncThunk(
  "Report/EmailBlotterTransactionDetailsForTreasury", // A unique action type string
  async (
    { Data, navigate, setOpenMailModal },
    { dispatch, rejectWithValue }
  ) => {
    try {
      let EmailBlotterTransactionDetailsForTreasuryData = createPostAPI(
        reportApi,
        EmailBlotterTransactionDetailsForTreasury.RequestMethod
      );

      const response = await EmailBlotterTransactionDetailsForTreasuryData(
        Data
      );
      console.log(
        response,
        "EmailBlotterTransactionDetailsForTreasuryResponse"
      );
      const { data, status } = response;
      if (data?.responseCode === 417) {
        await dispatch(refreshTokenAction({ navigate }));return
        dispatch(
          EmailBlotterTransactionDetailsForTreasuryAPI({
            Data,
            navigate,
            setOpenMailModal,
          })
        );
      }
      if (status === 200) {
        const { isExecuted, responseMessage } = data;
        if (isExecuted) {
          if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForTreasury_01".toLowerCase()
              )
          ) {
            setOpenMailModal(false);
            console.log("Email Sent Successfully");
            return {
              response: null,
              message: "Email Sent Successfully",
            };
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForTreasury_02".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForTreasury_03".toLowerCase()
              )
          ) {
            return rejectWithValue("Something went wrong");
          } else if (
            responseMessage
              .toLowerCase()
              .includes(
                "Report_ReportServiceManager_EmailBlotterTransactionDetailsForTreasury_04".toLowerCase()
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
        console.log("", response.data);
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      // Reject with error message
      console.log("", error);
      return rejectWithValue("Something went wrong");
    }
  }
);
