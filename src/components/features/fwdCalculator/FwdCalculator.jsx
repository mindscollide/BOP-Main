import React, { useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import InputFIeld from "../../common/inputField/InputField";
import InputFieldWithTag from "../../common/inputFieldWithTag/InputFieldWithTag";
import SelectDropdown from "../../common/selectDropdown/SelectDropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "@/common/utils";
import { calculateTenorSwapAndForwardRateApi } from "../blotter/BlotterActions";

const FwdCalculator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Drop down Instruments  Data
  const InstrumentsData = useSelector(
    (state) => state.authReducer.getAllInstruments
  );

  // //World Crosses Data to Get the Cross Rates Without Spread
  // const WorldCrossesData = useSelector(
  //   (state) => state.WatchListReducer.GetBankSpotForTreasury
  // );

  //Resulting Calculated value of Forwads
  const CalculatedForwards = useSelector(
    (state) => state?.BlotterSlicer?.calculateTenorSwapAndForwardRateData
  );

  //Local States
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionImportExport, setSelectedOptionImportExport] =
    useState(null);
  const [forwardApplicableList, setForwardApplicableList] = useState([]);
  const [ready, setReady] = useState(0);
  const [inputValue, setInputValue] = useState("0");
  const [tagText, setTagText] = useState(formatDate(new Date()));
  const [resulteForwards, setResulteForwards] = useState(0);
  const [resulteSwap, setResulteSwap] = useState(0);

  // Import Export Options
  const options = [
    {
      label: "Export",
      value: 1,
    },
    {
      label: "Import",
      value: 2,
    },
  ];

  //Extracting out the Forward Applicable and nonForward Applicable Instruments
  useEffect(() => {
    try {
      if (
        InstrumentsData?.instruments &&
        Array.isArray(InstrumentsData.instruments) &&
        options.length > 0
      ) {
        const Forwards = InstrumentsData.instruments
          .filter((item) => item.forwardsApplicable === true)
          .map((item) => ({
            value: item.instrumentID,
            label: item.instrumentName,
          }));

        setForwardApplicableList(Forwards);

        // Automatically select USD by default
        const defaultUSD = Forwards.find((item) => item.label === "USD");
        if (defaultUSD) {
          setSelectedOption(defaultUSD);
        }

        setSelectedOptionImportExport(options[0]);
      }
    } catch (error) {
      console.error("Error processing instrument data:", error);
    }
  }, [InstrumentsData]);

  // Effect to update date whenever inputValue changes
  useEffect(() => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + num);
      setTagText(formatDate(newDate));
    }
  }, [inputValue]);

  //Extracting the Calculating forward values
  useEffect(() => {
    try {
      if (CalculatedForwards && CalculatedForwards !== null) {
        setResulteForwards(CalculatedForwards.forwardRate);
        setResulteSwap(CalculatedForwards.swap);
        setReady(CalculatedForwards.readyRate);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [CalculatedForwards]);

  // Only allow numeric input Tenor
  const handleInputChangeTenor = (e) => {
    const value = e.target.value;

    // Allow only digits and up to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      const numericValue = parseInt(value, 10);
      const newDate = new Date();

      // Allow empty input (for typing) or numbers from 1 to 1000
      if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
        setInputValue(value);
      }

      if (value !== "") {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + numericValue); // Use numericValue here
        setTagText(formatDate(newDate));
      } else {
        setTagText(formatDate(newDate)); // Optional: clear tag text if input is empty
      }
    }
  };

  const handleCalculateForwardsRate = () => {
    let Data = {
      IsBuySide: selectedOptionImportExport.value === 1 ? true : false,
      TenorDays: Number(inputValue),
      InstrumentName: selectedOption.label,
      InstrumentID: Number(selectedOption.value),
    };
    dispatch(calculateTenorSwapAndForwardRateApi({ Data, navigate }));
  };

  return (
    <>
      <div className="card-box h-auto">
        <div className="box-header bg-primary-orange px-2 color-white">
          <div className="d-flex align-items-center">
            <div className="fs-6 fw-bold">FWD Calculator</div>
            <div className="clc-btn-wrapper ms-auto">
              <CustomButton
                value="Calculate Rate"
                applyClass="calculatorButton"
                onClick={handleCalculateForwardsRate}
              />
            </div>
          </div>
        </div>
        <div className="box-content-wrapper h-auto">
          <div className="d-flex align-items-center w-100">
            <div className="flex-fill px-2 p-2">
              <div className="d-flex flex-row gap-4  w-100">
                <div className="d-flex flex-column flex-fill">
                  <label className={"mt-1"}>Currency</label>
                  <SelectDropdown
                    options={forwardApplicableList}
                    value={selectedOption}
                    onChange={(selected) => setSelectedOption(selected)}
                    placeholder="Select a currency"
                    classNamePrefix="RfqSpot"
                  />
                </div>

                <div className="d-flex flex-column flex-fill justify-content-center mt-4">
                  <SelectDropdown
                    options={options}
                    value={selectedOptionImportExport}
                    onChange={(selected) =>
                      setSelectedOptionImportExport(selected)
                    }
                    placeholder="Import"
                    classNamePrefix="RfqSpot"
                  />
                </div>
              </div>

              <label className="mt-1">Ready</label>
              <InputFIeld
                type="number"
                name="price"
                defaultValue="0"
                value={ready}
                applyClass={"CalculatorTextfield"}
                // onChange={handleReadyValue}
                disabled={true}
              />

              <label className="mt-1">Tenor</label>
              <InputFieldWithTag
                type="text"
                value={inputValue}
                onChange={handleInputChangeTenor}
                placeholder="Enter value"
                applyClass="inputField-calculator"
                applyClassTag="tag-for-calculator"
                width="100%"
                inputWidth="50%"
                tagText={tagText}
                tagWidth="50%"
                tagClassName="yourTagClass"
              />

              <label className="mt-1">Swap</label>
              <InputFIeld
                value={Number(resulteSwap).toFixed(4)}
                disabled={true}
                applyClass="CalculatorTextfield-withTagInputfield"
              />
            </div>
            <div className="px-2 text-center">
              <div className="clc-amount fs-4 fw-bold px-4 py-3 bg-dark-gray color-white">
                {resulteForwards}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FwdCalculator;
