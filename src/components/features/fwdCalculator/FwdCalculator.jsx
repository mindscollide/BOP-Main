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
import { CalculateForwardsAPI } from "@/container/pages/mainCalculator/CalculatorActions";

const FwdCalculator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Drop down Currency Data
  const CurrencyData = useSelector(
    (state) => state.CalculatorReducer.calculatorData
  );

  // //Resulting Calculated value of Forwads
  const CalculatedForwards = useSelector(
    (state) => state?.CalculatorReducer?.calculateForwardsData?.forwardRate || 0
  );

  //Local States
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionImportExport, setSelectedOptionImportExport] =
    useState(null);
  const [swapValue, setSwapValue] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [price, setPrice] = useState(285.2635);
  const [inputValue, setInputValue] = useState("0");
  const [tagText, setTagText] = useState(formatDate(new Date()));

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

  //Extracting the currecny Data
  useEffect(() => {
    try {
      if (CurrencyData && CurrencyData !== null) {
        // Transform currency data into label/value format
        const options = CurrencyData.currency.map((item) => {
          if (item.currency === "USD") {
            setSelectedOption({
              label: item.currency,
              value: item.ready,
            });
            setPrice(item.ready);
          }
          return {
            label: item.currency,
            value: item.ready,
          };
        });
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
  };

  //Handle onChange Import Export
  const handleChangeCurrencyImportExport = (selected) => {
    setSelectedOptionImportExport(selected);

    if (!selectedOption) {
      return;
    }

    const selectedCurrencyCode = selectedOption.label;
    const matchedCurrency = CurrencyData?.currency?.find(
      (item) => item.currency === selectedCurrencyCode
    );

    //Placing the BID Ask Value rates according to the currency
    if (matchedCurrency) {
      let price = 0;

      if (selected.label === "Import") {
        price = matchedCurrency.readyBID;
      } else if (selected.label === "Export") {
        price = matchedCurrency.readyASK;
      } else {
        price = matchedCurrency.ready;
      }

      setPrice(price);
    }
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

    // Allow only digits and up to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      const numericValue = parseInt(value, 10);

      // Allow empty input (for typing) or numbers from 1 to 1000
      if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
        setInputValue(value);
      }
    }
  };

  // Only allow numeric input Swap
  // Only allow numeric input Swap
  const handleInputChangeSwap = (e) => {
    const value = e.target.value;

    // Allow optional negative sign, up to 2 digits before decimal, up to 4 digits after decimal
    if (/^-?\d{0,2}(\.\d{0,4})?$/.test(value)) {
      setSwapValue(value);
    }
  };

  // Handle Change Ready Value
  const handleReadyValue = (e) => {
    const value = e.target.value;

    // Match format: up to 4 digits before decimal, up to 4 digits after
    if (/^\d{0,4}(\.\d{0,4})?$/.test(value)) {
      const [integerPart] = value.split(".");

      // Allow empty string (for typing) or numeric part between 1 and 1000
      if (
        value === "" ||
        (parseInt(integerPart, 10) >= 1 && parseInt(integerPart, 10) <= 1000)
      ) {
        setPrice(value);
      }
    }
  };

  const handleCalculateForwardsRate = () => {
    let Data = {
      Export_Import: Number(selectedOptionImportExport.value),
      Ready: Number(price),
      Tenor: Number(inputValue),
      Swap: Number(swapValue),
    };

    dispatch(CalculateForwardsAPI({ Data, navigate }));
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
                  <label className="mt-1">Currency</label>
                  <SelectDropdown
                    options={currencyOptions}
                    value={selectedOption}
                    onChange={handleChangeCurrencyCalculator}
                    placeholder="Select a currency"
                  />
                </div>

                <div className="d-flex flex-column flex-fill justify-content-center mt-4">
                  <SelectDropdown
                    options={options}
                    value={selectedOptionImportExport}
                    onChange={handleChangeCurrencyImportExport}
                    placeholder="Import"
                  />
                </div>
              </div>

              <label className="mt-1">Ready</label>
              <InputFIeld
                type="number"
                name="price"
                defaultValue="285.2635"
                value={price}
                applyClass={"CalculatorTextfield"}
                onChange={handleReadyValue}
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

              <label className="mt-1">swap</label>
              <InputFIeld
                value={swapValue}
                onChange={handleInputChangeSwap}
                applyClass="CalculatorTextfield-withTagInputfield"
              />
            </div>
            <div className="px-2 text-center">
              <div className="clc-amount fs-4 fw-bold px-4 py-3 bg-dark-gray color-white">
                {CalculatedForwards}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FwdCalculator;
