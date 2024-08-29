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

/**
 * Creates dynamic columns for an Ant Design table based on provided data and type.
 *
 * @param {Array} data - The data used to generate columns, containing instrument information.
 * @param {number} value - Determines the type of columns to create (1 for Discount, others for Forwards).
 * @returns {Array} - An array of column configurations for the Ant Design table.
 */
export const createColumns = (data, value) => {
  // Base column that will always be present, containing the Tenor column
  const baseColumns = [
    {
      title: "", // Empty title for a merged header style
      dataIndex: "", // No data index for this parent column
      key: "", // Key for the parent column
      align: "", // Alignment (empty for this parent column)
      width: 100, // Set column width

      children: [
        {
          title: "Tenor", // Header name for the child column
          dataIndex: "tenorName", // Data key from the dataset for Tenor
          key: "tenor", // Unique key for the child column
          align: "center", // Center align the content
          width: 100, // Set column width
        },
      ],
    },
  ];

  let instrumentColumns = [];

  try {
    // Check if value is 1 to create Discount columns, otherwise create Forwards columns
    if (value === 1) {
      // Create Discount columns
      instrumentColumns = data.reduce((acc, item) => {
        const instrument = item.instrumentTitle;

        // Check if the instrument column already exists in acc
        if (!acc.find((col) => col.title === instrument)) {
          acc.push({
            title: instrument, // Title of the instrument column
            key: instrument, // Unique key for the instrument column

            children: [
              {
                title: "Value", // Title for the child column
                dataIndex: "value", // Data key for Value from the dataset
                key: `${instrument}-value`, // Unique key for the child column
                align: "center", // Center align the content
                width: 100, // Set column width
              },
            ],
          });
        }

        return acc; // Return the accumulator with newly added column if applicable
      }, []);
    } else {
      // Create Forwards columns
      instrumentColumns = data.reduce((acc, item) => {
        const instrument = item.instrumentName;

        // Check if the instrument column already exists in acc
        if (!acc.find((col) => col.title === instrument)) {
          acc.push({
            title: instrument, // Title of the instrument column
            key: instrument, // Unique key for the instrument column

            children: [
              {
                title: "Bid", // Title for the Bid child column
                dataIndex: "bid", // Data key for Bid from the dataset
                key: `${instrument}-bid`, // Unique key for the Bid child column
                align: "center", // Center align the content
                width: 100, // Set column width
              },
              {
                title: "Ask", // Title for the Ask child column
                dataIndex: "ask", // Data key for Ask from the dataset
                key: `${instrument}-ask`, // Unique key for the Ask child column
                align: "center", // Center align the content
                width: 100, // Set column width
              },
            ],
          });
        }

        return acc; // Return the accumulator with newly added column if applicable
      }, []);
    }
  } catch (error) {
    console.error("Error creating columns:", error);
    // Handle error appropriately here, e.g., log error, return a default column structure, etc.
    // For example, returning only baseColumns in case of error
    return baseColumns;
  }

  // Combine base columns and dynamically generated instrument columns
  return [...baseColumns, ...instrumentColumns];
};
