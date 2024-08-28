let Data = {
  tenors: [
    {
      tenorID: 1,
      tenorName: "1 Month",
      tenorDays: 30,
    },
    {
      tenorID: 2,
      tenorName: "3 Months",
      tenorDays: 90,
    },
    {
      tenorID: 3,
      tenorName: "6 Months",
      tenorDays: 180,
    },
    {
      tenorID: 4,
      tenorName: "1 Year",
      tenorDays: 365,
    },
  ],
  instruments: [
    {
      instrumentID: 1,
      instrumentName: "Instrument A",
    },
    {
      instrumentID: 2,
      instrumentName: "Instrument B",
    },
    {
      instrumentID: 3,
      instrumentName: "Instrument C",
    },
  ],
  forwardRates: [
    {
      tenorID: 1,
      instrumentID: 1,
      bid: 1.25,
      ask: 1.3,
    },
    {
      tenorID: 2,
      instrumentID: 2,
      bid: 1.35,
      ask: 1.4,
    },
    {
      tenorID: 3,
      instrumentID: 3,
      bid: 1.45,
      ask: 1.5,
    },
  ],
  discountRates: [
    {
      tenorID: 1,
      instrumentID: 1,
      rate: 0.02,
    },
    {
      tenorID: 2,
      instrumentID: 2,
      rate: 0.025,
    },
    {
      tenorID: 3,
      instrumentID: 3,
      rate: 0.03,
    },
  ],
};
export const generateData = (columnValue) => {
  let discountRates = [];
  let forwardsRates = [];
  if (columnValue === 1) {
    Data.discountRates.map((discValue, index) => {
      let findTenorName = Data.tenors.find(
        (tenorsData) => tenorsData.tenorID === discValue.tenorID
      );
      let findInstrumentName = Data.instruments.find(
        (insturmentData) =>
          insturmentData.instrumentID === discValue.instrumentID
      );

      const discountRateValue = {
        key: `index ${index + 1}`,
        Tenor: findTenorName ? findTenorName.tenorName : "",
        TenorID: findTenorName ? findTenorName.tenorID : 0,
        tenorDays: findTenorName ? findTenorName.tenorDays : "",
        instrumentTitle: findInstrumentName
          ? findInstrumentName.instrumentName
          : "",
        InstrumentID: findInstrumentName ? findInstrumentName.instrumentID : 0,
        value: discValue.rate,
      };

      discountRates.push(discountRateValue);
    });
  } else {
    Data.forwardRates.map((forwData, index) => {
      let findTenorName = Data.tenors.find(
        (tenorsData) => tenorsData.tenorID === forwData.tenorID
      );
      let findInstrumentName = Data.instruments.find(
        (insturmentData) =>
          insturmentData.instrumentID === forwData.instrumentID
      );

      const forwardRateData = {
        key: `index ${index + 1}`,
        Tenor: findTenorName ? findTenorName.tenorName : "",
        TenorID: findTenorName ? findTenorName.tenorID : 0,
        tenorDays: findTenorName ? findTenorName.tenorDays : "",
        instrumentName: findInstrumentName
          ? findInstrumentName.instrumentName
          : "",
        InstrumentID: findInstrumentName ? findInstrumentName.instrumentID : 0,

        ask: forwData.ask,
        bid: forwData.bid,
      };

      forwardsRates.push(forwardRateData);
    });
  }

  // Return the result as an object or array if needed
  return { discountRates, forwardsRates };
};
