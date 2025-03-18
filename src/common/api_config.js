const loginRequestMethod = {
  RequestMethod: "ServiceManager.Login",
};

const corporateUserRequestMethod = {
  RequestMethod: "ServiceManager.CorporateUserLogin",
};

const sendEmailForResetPaswordRM = {
  RequestMethod: "ServiceManager.SendEmailForResetPasword",
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

export {
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
};
