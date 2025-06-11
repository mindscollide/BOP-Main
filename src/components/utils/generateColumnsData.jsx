export function buildDiscountingTable(
  value,
  Data,
  getAllTenorsData,
  getAllInstrument,
  InputFIeld,
  onInputChange
) {
  if (!Data || !getAllTenorsData || !getAllInstrument) {
    return { rowData: [], columnsData: [] };
  }

  try {
    const { tenors } = getAllTenorsData;
    const { instruments } = getAllInstrument;

    // Step 1: Filter applicable instruments and tenors
    const applicableInstruments =
      instruments?.filter((inst) => inst.discountingApplicable) || [];
    const applicableTenors =
      tenors?.filter((tenor) => tenor.isDiscountingApplicable) || [];

    // Step 2: Create a map using composite key (instrumentID-tenorID)
    const rateMap = {};
    Data?.forEach((rate) => {
      const key = `${rate.instumentID}-${rate.tenorID}`;
      rateMap[key] = rate.rate;
    });

    // Step 3: Build the row data
    const rowData = applicableTenors.map((tenor) => {
      const row = {
        TenorID: tenor.tenorID,
        tenorName: tenor.tenorName,
        tenorDays: tenor.tenorDays,
      };

      applicableInstruments.forEach((instrument) => {
        const compositeKey = `${instrument.instrumentID}-${tenor.tenorID}`;
        const rateValue = rateMap[compositeKey] ?? 0;

        row[`rate_${instrument.instrumentName}`] = rateValue;
        row[`InstrumentID_${instrument.instrumentName}`] =
          instrument.instrumentID;
        row[`InstrumentName_${instrument.instrumentName}`] =
          instrument.instrumentName;
      });

      return row;
    });
    let columnsData = [];
    if (value === 1) {
      columnsData = [
        {
          title: "Tenor",
          dataIndex: "tenorName",
          key: "tenorName",
          width: 80,
        },
        ...applicableInstruments.map((inst) => ({
          title: inst.instrumentName,
          dataIndex: `rate_${inst.instrumentName}`,
          key: `rate_${inst.instrumentName}`,
          align: "center",
          width: 60,
          render: (text, record) => (
            <InputFIeld
              value={text}
              record={record}
              instrumentName={inst.instrumentName}
              onInputChange={onInputChange}
            />
          ),
        })),
      ];
    } else {
      columnsData = [
        {
          title: "Tenor",
          dataIndex: "tenorName",
          key: "tenorName",
          width: 80,
        },
        ...applicableInstruments.map((inst) => ({
          title: inst.instrumentName,
          key: `rate_${inst.instrumentName}`,
          align: "center",
          width: 60,
          children: [
            {
              title: "value",
              dataIndex: `rate_${inst.instrumentName}`,
              render: (text, record) => (
                <InputFIeld
                  value={text}
                  record={record}
                  // instrumentName={inst.instrumentName}
                  // onInputChange={onInputChange}
                />
              ),
            },
          ],
        })),
      ];
    }

    // Step 4: Build the column definitions

    return { rowData, columnsData };
  } catch (error) {
    console.error("Error while building discounting table:", error);
    return { rowData: [], columnsData: [] };
  }
}

export const buildCurrentRatesPayload = (rowData) => {
  const currentRates = [];

  rowData.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (key.startsWith("rate_")) {
        const instrumentName = key.replace("rate_", "");
        const instrumentIDKey = `InstrumentID_${instrumentName}`;
        const rate = parseFloat(row[key]);

        if (!isNaN(rate)) {
          currentRates.push({
            TenorID: row.TenorID,
            InstumentID: row[instrumentIDKey],
            InstrumentName: instrumentName,
            Rate: rate,
          });
        }
      }
    });
  });

  return currentRates;
};
