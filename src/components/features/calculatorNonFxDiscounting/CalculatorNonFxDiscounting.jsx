import React, { useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import InputFIeld from "../../common/inputField/InputField";
import InputFieldWithTag from "../../common/inputFieldWithTag/InputFieldWithTag";
import SelectDropdown from "../../common/selectDropdown/SelectDropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "@/common/utils";
import { calculateNonFeSwapAndDiscountingRateApi } from "../blotter/BlotterActions";

const CalculatorNonFxDiscounting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Drop down Instruments  Data
  const InstrumentsData = useSelector(
    (state) => state.authReducer.getAllInstruments
  );
  console.log(InstrumentsData, "instruments data");
  //World Crosses Data to Get the Cross Rates Without Spread
  const WorldCrossesData = useSelector(
    (state) => state.WatchListReducer.GetBankSpotForTreasury
  );

  //Resulting Calculated value of NonFX Discounting
  const CalculatedNonFxDiscounting = useSelector(
    (state) => state?.BlotterSlicer?.calculateNonFeSwapAndDiscountingRate
  );

  //Local States
  const [selectedOption, setSelectedOption] = useState(null);
  const [discountingApplicableList, setDiscountingApplicableList] = useState(
    []
  );
  const [ready, setReady] = useState(0);
  const [inputValue, setInputValue] = useState("0");
  const [nonFERate, setNonFERate] = useState(0);
  const [calculatedSwap, setCalculatedSwap] = useState(0);
  const [calculatedKibor, setCalculatedKibor] = useState(0);
  const [tagText, setTagText] = useState(formatDate(new Date()));

  useEffect(() => {
    try {
      if (
        InstrumentsData?.instruments &&
        Array.isArray(InstrumentsData.instruments) &&
        WorldCrossesData?.worldCrosses
      ) {
        const discountings = InstrumentsData.instruments
          .filter((item) => item.isNonFEDiscountingApplicable === true)
          .map((item) => ({
            value: item.instrumentID,
            label: item.instrumentName,
          }));

        setDiscountingApplicableList(discountings);

        // Select USD by default in discountingApplicableList
        const defaultUSD = discountings.find((item) => item.label === "USD");

        if (defaultUSD) {
          setSelectedOption(defaultUSD);
        }
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

  // Saving Output KIBOR Non -FE Rate and Swap Val
  useEffect(() => {
    try {
      if (CalculatedNonFxDiscounting && CalculatedNonFxDiscounting !== null) {
        setNonFERate(CalculatedNonFxDiscounting.nonFERate);
        setCalculatedSwap(CalculatedNonFxDiscounting.swap);
        setCalculatedKibor(CalculatedNonFxDiscounting.kibor);
        setReady(CalculatedNonFxDiscounting.readyRate);
      }
    } catch (error) {
      console.log(error);
    }
  }, [CalculatedNonFxDiscounting]);

  // Only allow numeric input Tenor
  const handleInputChangeTenor = (e) => {
    const value = e.target.value;

    // Allow only digits and up to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      const numericValue = parseInt(value, 10);
      const newDate = new Date();
      // Allow empty input or numbers from 1 to 1000
      if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
        setInputValue(value);

        if (value !== "") {
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + numericValue); // Use numericValue here
          setTagText(formatDate(newDate));
        } else {
          setTagText(formatDate(newDate)); // Optional: clear tag text if input is empty
        }
      }
    }
  };

  //Calculate Non Fx Discounting API Call
  const handleNonFxDiscounting = () => {
    if (selectedOption !== null) {
      let Data = {
        TenorDays: Number(inputValue),
        InstrumentName: selectedOption.label,
        InstrumentID: Number(selectedOption.value),
      };
      dispatch(calculateNonFeSwapAndDiscountingRateApi({ Data, navigate }));
    }
  };

  return (
    <>
      <div className="card-box h-auto">
        <div className="box-header bg-primary-orange px-2 color-white">
          <div className="d-flex align-items-center">
            <div className="fs-6 fw-bold">Non FX Discounting</div>
            <div className="clc-btn-wrapper ms-auto">
              <CustomButton
                value="Calculate Rate"
                applyClass="calculatorButton"
                onClick={handleNonFxDiscounting}
              />
            </div>
          </div>
        </div>
        <div className="box-content-wrapper h-auto">
          <div className="d-flex align-items-center">
            <div className="flex-fill px-2 p-2">
              <label className="mt-1">Currency</label>
              <SelectDropdown
                options={discountingApplicableList}
                value={selectedOption}
                onChange={(selected) => setSelectedOption(selected)}
                placeholder="Select a currency"
                classNamePrefix="RfqSpot"
              />

              <label className="mt-1">Ready</label>
              <InputFIeld
                type="number"
                name="price"
                defaultValue="0"
                value={ready}
                applyClass={"CalculatorTextfield"}
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
                width="100%" // width of the entire container
                inputWidth="50%" // width of the input field
                tagText={tagText}
                tagWidth="50%" // width of the span
                tagClassName="yourTagClass"
              />

              <div className="d-flex flex-row mt-1 gap-2">
                <span className="d-flex flex-column">
                  <label>Swap</label>
                  <InputFIeld
                    value={calculatedSwap}
                    disabled={true}
                    applyClass="CalculatorTextfield-withTagInputfield"
                  />
                </span>

                <span className="d-flex flex-column">
                  <label>KIBOR</label>
                  <InputFieldWithTag
                    type="text"
                    value={calculatedKibor}
                    disabled={true}
                    applyClass="inputField-calculator"
                    applyClassTag="tag-for-calculator"
                    width="100%"
                    inputWidth="75%"
                    tagText="%"
                    tagWidth="25%"
                    // tagClassName="yourTagClass"
                  />
                </span>
              </div>
            </div>
            <div className="px-2 text-center">
              <div className="clc-amount fs-4 fw-bold px-4 py-3 bg-primary color-white">
                {nonFERate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorNonFxDiscounting;
