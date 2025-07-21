import React, { useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import GlobalTable from "../../common/table/GlobalTable";
import InputFIeld from "../../common/inputField/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishDiscountingRatesAction } from "@/container/pages/mainDealer/dealerActions";
import { useSelector } from "react-redux";
import { formatPercentageInput } from "@/utils/formatters";

const DealeAndTreasuryDiscountingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const getDiscountTableData = useSelector(
    (state) => state.dealerReducer.getDiscountingWiseRates
  );
  // useEffect(() => {}, []);

  useEffect(() => {
    if (getDiscountTableData !== null) {
      try {
        const { currentRates, previousRates } = getDiscountTableData;
        if (currentRates.length > 0) {
          let newRecords = currentRates.map((item, index) => {
            let getRecords = previousRates.find(
              (prevItem) => prevItem.instumentID === item.instumentID
            );
            if (getRecords !== undefined) {
              return {
                key: index + 1,
                instrumentName: item.instrumentName,
                instrumentID: item.instumentID,
                currentRate: item.rate,
                previousRate: getRecords.rate,
                dateTime: item.dateTime,
              };
            } else {
              return {
                key: index + 1,
                instrumentName: item.instrumentName,
                instrumentID: item.instumentID,
                currentRate: item.rate,
                dateTime: item.dateTime,

                previousRate: "",
              };
            }
          });
          setTableData(newRecords);
        }
      } catch (error) {}
    }
  }, [getDiscountTableData]);

  // Data for the table
  const dataSource = [
    { key: "1", currency: "USD", currentRate: 0, previousRate: "" },
    { key: "2", currency: "EUR", currentRate: 0, previousRate: "" },
    { key: "3", currency: "GBP", currentRate: 0, previousRate: "" },
    { key: "4", currency: "JPY", currentRate: 0, previousRate: "" },
    { key: "5", currency: "CNY", currentRate: 0, previousRate: "" },
  ];

  const handleChangeCurrent = (event, record) => {
    const { value } = event.target;
    setTableData((prev) => {
      if (prev.length > 0) {
        let getRecords = prev.map((item) => {
          if (item.instrumentID === record.instrumentID) {
            return {
              ...item,
              currentRate: formatPercentageInput(value),
            };
          } else {
            return item;
          }
        });
        return getRecords;
      }
    });
  };

  // Columns for the table
  const columns = [
    {
      title: "Currency",
      dataIndex: "instrumentName",
      key: "instrumentName",
      align: "left",
    },
    {
      title: "Current Rate %",
      dataIndex: "currentRate",
      key: "currentRate",
      align: "center",
      render: (value, record) => {
        return (
          <InputFIeld
            type="number"
            applyClass="DealerTableBitInput"
            value={value}
            onChange={(event) => handleChangeCurrent(event, record)}
          />
        );
      },
    },
    {
      title: "Previous Rate %",
      dataIndex: "previousRate",
      key: "previousRate",
      align: "center",
      render: (value) => (
        <InputFIeld
          type="number"
          disabled={true}
          defaultValue={value}
          applyClass="DealerTableBitInput"
        />
      ),
    },
  ];

  const handlePublishDiscount = () => {
    let newData = {
      CurrentRates: tableData.map((records, index) => {
        return {
          InstumentID: records.instrumentID,
          InstrumentName: records.instrumentName,
          Rate: records.currentRate,
        };
      }),
    };
    dispatch(publishDiscountingRatesAction({ navigate, Data: newData }));
  };
  return (
    <>
      <GlobalTable
        prefixCls="DealerAndTreasuryDiscountTable"
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />

      <span className="d-flex justify-content-center mt-4">
        <CustomButton
          applyClass="publishForwardsBtn"
          value={"Publish Discounting"}
          onClick={handlePublishDiscount}
        />
      </span>
    </>
  );
};

export default DealeAndTreasuryDiscountingTable;
