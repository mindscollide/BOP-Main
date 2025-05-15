import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CustomButton from "../../common/globalButton/button";
import InputFIeld from "../../common/inputField/InputField";
import InputFieldWithTag from "../../common/inputFieldWithTag/InputFieldWithTag";
import SelectDropdown from "../../common/selectDropdown/SelectDropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "@/common/utils";

const CalculatorNonFxDiscounting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CurrencyData = useSelector(
    (state) => state.CalculatorReducer.calculatorData
  );

  //Local States
  const [selectedOption, setSelectedOption] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [price, setPrice] = useState(285.2635);
  const [inputValue, setInputValue] = useState("0");
  const [kiborValue, setKiborValue] = useState(0);
  const [swapValue, setSwapValue] = useState(0);
  const [tagText, setTagText] = useState(formatDate(new Date()));

  //Extracting the currecny Data
  useEffect(() => {
    try {
      if (CurrencyData && CurrencyData !== null) {
        // Transform currency data into label/value format
        const options = CurrencyData.currency.map((item) => ({
          label: item.currency,
          value: item.ready,
        }));
        setCurrencyOptions(options);
      }
    } catch (error) {
      console.log(error);
    }
  }, [CurrencyData]);

  // Effect to update date whenever inputValue changes
  useEffect(() => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + num);
      setTagText(formatDate(newDate));
    }
  }, [inputValue]);

  //Handle onChange Currency
  const handleChangeCurrencyCalculator = (selected) => {
    setSelectedOption(selected);
    setPrice(selected.value);
    console.log("Selected", selected.label);
    console.log("Selected", selected.value);
  };

  // Only allow numeric or decimal values handle change Ready
  const handleInputChange = (e) => {
    const val = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (val === "" || regex.test(val)) {
      setPrice(val);
    }
  };

  // Only allow numeric input Tenor
  const handleInputChangeTenor = (e) => {
    const value = e.target.value;
    // Only allow digits, optional negative sign at start
    if (/^-?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  // Only allow numeric input Kibor
  const handleInputChangeKibor = (e) => {
    const value = e.target.value;
    // Only allow digits, optional negative sign at start
    if (/^-?\d*$/.test(value)) {
      setKiborValue(value);
    }
  };

  // Only allow numeric input Kibor
  const handleInputChangeSwap = (e) => {
    const value = e.target.value;
    // Only allow digits, optional negative sign at start
    if (/^-?\d*$/.test(value)) {
      setSwapValue(value);
    }
  };

  const handleNonFxDiscounting = () => {};

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
                options={currencyOptions}
                value={selectedOption}
                onChange={handleChangeCurrencyCalculator}
                placeholder="Select a currency"
              />

              <label className="mt-1">Ready</label>
              <InputFIeld
                type="number"
                name="price"
                defaultValue="285.2635"
                value={price}
                onChange={handleInputChange}
                applyClass={"CalculatorTextfield"}
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
                inputWidth="60%" // width of the input field
                tagText={tagText}
                tagWidth="40%" // width of the span
                tagClassName="yourTagClass"
              />

              <div className="d-flex flex-row mt-1">
                <span className="d-flex flex-column">
                  <label>Swap</label>
                  <InputFIeld
                    value={swapValue}
                    onChange={handleInputChangeSwap}
                    applyClass="CalculatorTextfield-withTagInputfield"
                  />
                </span>

                <span className="d-flex flex-column">
                  <label>KIBOR</label>
                  <InputFieldWithTag
                    type="text"
                    value={kiborValue}
                    onChange={handleInputChangeKibor}
                    placeholder="Enter value"
                    applyClass="inputField-calculator"
                    applyClassTag="tag-for-calculator"
                    width="100%" // width of the entire container
                    inputWidth="80%" // width of the input field
                    tagText="%"
                    tagWidth="20%" // width of the span
                    tagClassName="yourTagClass"
                  />
                </span>
              </div>
            </div>
            <div className="px-2 text-center">
              <div className="clc-amount fs-4 fw-bold px-4 py-3 bg-primary color-white">
                285.26
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorNonFxDiscounting;
