const loginRequestMethod = {
  RequestMethod: "ServiceManager.Login",
};

const corporateUserRequestMethod = {
  RequestMethod: "ServiceManager.CorporateUserLogin",
};

const sendEmailForResetPaswordRM = {
  RequestMethod: "ServiceManager.SendEmailForResetPasword",
};

const refreshTokenRM = {
  RequestMethod: "ServiceManager.RefreshToken",
};

const clearRatesRM = {
  RequestMethod: "ServiceManager.ClearRates",
};

const marketOnOffRM = {
  RequestMethod: "ServiceManager.MarketONOFF",
};

const getLastAndCurrentUSDRatesRM = {
  RequestMethod: "ServiceManager.GetTheLastAndCurrentPublishUSDRates",
};

const publishCurrentUSDRatesRM = {
  RequestMethod: "ServiceManager.PublishTheCurrentUSDRates",
};

const createTenorRM = {
  RequestMethod: "ServiceManager.CreateTenor",
};

const getAllTenorsRM = {
  RequestMethod: "ServiceManager.GetAllTenors",
};

const getTenorWiseForwardRatesRM = {
  RequestMethod: "ServiceManager.GetTenorWiseForwardRates",
};

const publishTenorWiseForwardRatesRM = {
  RequestMethod: "ServiceManager.PublishTenorWiseForwardRates",
};

const getDiscountingRatesRM = {
  RequestMethod: "ServiceManager.GetDiscountingRates",
};

const publishDiscountingRatesRM = {
  RequestMethod: "ServiceManager.PublishDiscountingRates",
};

const GetFXInstruments = {
  RequestMethod: "ServiceManager.GetFXInstruments",
};

const GetMisDataByRange = {
  RequestMethod: "ServiceManager.GetMisDataByRange",
};

const GetAllFowardsAndDiscountsRates = {
  RequestMethod: "ServiceManager.GetAllFowardsAndDiscountsRates",
};

const GetDashboardData = {
  RequestMethod: "ServiceManager.GetDashboardData",
};

const SaveUserDashboard = {
  RequestMethod: "ServiceManager.SaveUserDashboard",
};

const ViewAllNatureOfBussiness = {
  RequestMethod: "ServiceManager.ViewAllNatureOfBussiness",
};

const CorporateBlotterData = {
  RequestMethod: "ServiceManager.GetBlotterData",
};
const GetAllCounterPartyDataRM = {
  RequestMethod: "ServiceManager.GetAllCounterPartyData",
};

const getAllCategoriesRM = {
  RequestMethod: "ServiceManager.GetAllCategories",
};

const SaveTransactionRFQ = {
  RequestMethod: "ServiceManager.SaveTransactionRFQ",
};

const DownloadFile = {
  RequestMethod: "DownloadFile",
};

const validateLinkForCorporatePasswordRM = {
  RequestMethod: "ServiceManager.ValidateLinkForCorporatePassword",
};

const createCorporateUserPasswordRM = {
  RequestMethod: "ServiceManager.CreateCorporateUserPassword",
};

// Calculator Data
const getAllCalculatorData = {
  RequestMethod: "ServiceManager.GetCalculatorData",
};

// Calculator Fx Discounting
const calculateFxDiscountingData = {
  RequestMethod: "ServiceManager.CalculateFxDiscounting",
};

// Calculator NonFx Discounting
const calculateNonFxDiscountingData = {
  RequestMethod: "ServiceManager.CalculateNonFxDiscounting",
};

// Calculator Forwards
const calculateForwardsData = {
  RequestMethod: "ServiceManager.CalculateForward",
};

const getUserSettingsRM = {
  RequestMethod: "ServiceManager.GetUserSettings",
};

const updateUserSettingsRM = {
  RequestMethod: "ServiceManager.UpdateUserSettings",
};

const getMarketingTimingRM = {
  RequestMethod: "ServiceManager.GetMarketTimeSettings",
};

const LogoutRM = {
  RequestMethod: "ServiceManager.LogOut",
};

const getChatByTransactionIdRM = {
  RequestMethod: "ServiceManager.GetAllChatByTransactionID",
};

const saveChatRM = {
  RequestMethod: "ServiceManager.SaveChat",
};
export {
  saveChatRM,
  getChatByTransactionIdRM,
  LogoutRM,
  getUserSettingsRM,
  updateUserSettingsRM,
  getMarketingTimingRM,
  validateLinkForCorporatePasswordRM,
  createCorporateUserPasswordRM,
  getAllCategoriesRM,
  clearRatesRM,
  loginRequestMethod,
  corporateUserRequestMethod,
  sendEmailForResetPaswordRM,
  marketOnOffRM,
  getLastAndCurrentUSDRatesRM,
  publishCurrentUSDRatesRM,
  createTenorRM,
  getAllTenorsRM,
  getTenorWiseForwardRatesRM,
  publishTenorWiseForwardRatesRM,
  getDiscountingRatesRM,
  publishDiscountingRatesRM,
  GetFXInstruments,
  GetMisDataByRange,
  GetAllFowardsAndDiscountsRates,
  GetDashboardData,
  SaveUserDashboard,
  ViewAllNatureOfBussiness,
  CorporateBlotterData,
  refreshTokenRM,
  GetAllCounterPartyDataRM,
  SaveTransactionRFQ,
  DownloadFile,
  getAllCalculatorData,
  calculateFxDiscountingData,
  calculateNonFxDiscountingData,
  calculateForwardsData,
};
