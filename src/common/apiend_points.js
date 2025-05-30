const baseURL = "http://192.168.18.241";

const authPort = ":13000/ERM_Auth";

const uploadRatesPort = ":13010/UploadRate";

const watchListPort = ":13011/WatchList";

const BlotterPort = ":13001/Blotter";

const ReportPort = ":13006/ExcelReport";

const CalculatorPort = ":13003/Calculator";

const SettingPort = ":13008/Setting";

const ChatPort = ":13004/Chat"

const authApi = `${baseURL}${authPort}`;

const uploadRatesApi = `${baseURL}${uploadRatesPort}`;

const watchListApi = `${baseURL}${watchListPort}`;

const BlotterApi = `${baseURL}${BlotterPort}`;

const reportApi = `${baseURL}${ReportPort}`;

const CalculatorApi = `${baseURL}${CalculatorPort}`;

const settingApi = `${baseURL}${SettingPort}`;

const chatApi = `${baseURL}${ChatPort}`

export {
  authApi,
  uploadRatesApi,
  watchListApi,
  BlotterApi,
  reportApi,
  CalculatorApi,
  settingApi,
  chatApi
};
