import axios from "axios";

const baseURL = "http://192.168.18.241";

// Define API endpoints
const endpoints = {
  auth: `${baseURL}:13000/ERM_Auth`,
  uploadRates: `${baseURL}:13010/UploadRate`,
};

// Create Axios instance
const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Store all cancel tokens globally
const cancelTokens = new Map();

// Function to generate and store cancel tokens
const createCancelToken = (url) => {
  if (cancelTokens.has(url)) {
    cancelTokens
      .get(url)
      .cancel("Request canceled due to a new request or unmount.");
  }
  const source = axios.CancelToken.source();
  cancelTokens.set(url, source);
  return source.token;
};

// Function to make requests with cancel token
export const makeRequest = async (endpoint, method = "POST", data ) => {
  try {
    const url = endpoints[endpoint]; // Get full API URL
    const response = await apiClient({
      method,
      url,
      data: JSON.parse(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        "Content-Type": "application/json",
      },
      cancelToken: createCancelToken(url), // Automatically attach cancel token
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn(`Request to ${endpoint} was canceled.`);
      return null; // Return null to indicate request was canceled
    }
    throw error; // Throw other errors
  }
};

// Function to cancel all active requests globally
export const cancelAllRequests = () => {
  cancelTokens.forEach((source, url) => {
    source.cancel(`Request to ${url} was manually canceled.`);
  });
  cancelTokens.clear();
};

export { apiClient, endpoints };
