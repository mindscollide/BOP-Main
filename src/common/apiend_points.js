const baseURL = "http://192.168.18.241";

const authPort = ":13000/ERM_Auth";

const uploadRatesPort = ":13010/UploadRate";

const authApi = `${baseURL}${authPort}`;

const uploadRatesApi = `${baseURL}${uploadRatesPort}`;

export { authApi, uploadRatesApi };
