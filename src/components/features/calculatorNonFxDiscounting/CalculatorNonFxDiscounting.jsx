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
import { CalculateNonFxDiscountingAPI } from "@/container/pages/mainCalculator/CalculatorActions";

const CalculatorNonFxDiscounting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Drop down Instruments  Data
  const InstrumentsData = useSelector(
    (state) => state.authReducer.getAllInstruments
  );

  //World Crosses Data to Get the Cross Rates Without Spread
  const WorldCrossesData = useSelector(
    (state) => state.WatchListReducer.GetBankSpotForTreasury
  );

  console.log(InstrumentsData, "saif");
  console.log(WorldCrossesData, "saif");

  // //Resulting Calculated value of NonFX Discounting
  const CalculatedNonFxDiscounting = useSelector(
    (state) =>
      state?.CalculatorReducer?.calculateNonFXDiscountingData?.nonFXRate || 0
  );

  //Local States
  const [selectedOption, setSelectedOption] = useState(null);
  const [discountingApplicableList, setDiscountingApplicableList] = useState(
    []
  );
  const [price, setPrice] = useState(285.2635);
  const [inputValue, setInputValue] = useState("0");
  const [kiborValue, setKiborValue] = useState(0);
  const [swapValue, setSwapValue] = useState(0);
  const [tagText, setTagText] = useState(formatDate(new Date()));

  useEffect(() => {
    try {
      if (
        InstrumentsData?.instruments &&
        Array.isArray(InstrumentsData.instruments) &&
        WorldCrossesData?.worldCrosses
      ) {
        const discountings = InstrumentsData.instruments
          .filter((item) => item.discountingApplicable === true)
          .map((item) => ({
            value: item.instrumentID,
            label: item.instrumentName,
          }));

        setDiscountingApplicableList(discountings);

        //  Find USD in worldCrosses (this contains bid/offer)
        const matchedRateUSD = WorldCrossesData.worldCrosses.find((cross) => {
          const instrument = InstrumentsData.instruments.find(
            (item) =>
              item.instrumentID === cross.instrumentID &&
              item.instrumentName === "USD" &&
              item.discountingApplicable === true
          );
          return instrument !== undefined;
        });

        // If found, match with dropdown option and set selected + price
        if (matchedRateUSD) {
          const defaultUSDOption = discountings.find(
            (item) => item.value === matchedRateUSD.instrumentID
          );

          if (defaultUSDOption) {
            setSelectedOption(defaultUSDOption); // or your actual state for selected discounting option
            setPrice(matchedRateUSD.bid);
          } else {
            setPrice(null);
          }
        }
      }
    } catch (error) {
      console.error("Error processing instrument data:", error);
    }
  }, [InstrumentsData, WorldCrossesData]);

  console.log(
    discountingApplicableList,
    "InstrumentsDataInstrumentsDataInstrumentsData"
  );

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

    const selectedInstrumentID = selected?.value;

    // Find the corresponding rate from WorldCrossesData
    const matchedRate = WorldCrossesData?.worldCrosses?.find(
      (cross) => cross.instrumentID === selectedInstrumentID
    );

    if (matchedRate) {
      setPrice(matchedRate.bid);
    } else {
      setPrice(null);
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

  // Only allow numeric input Kibor
  const handleInputChangeKibor = (e) => {
    const value = e.target.value;
    // 2 digits before and 4 decimal points
    if (/^\d{0,2}(\.\d{0,4})?$/.test(value)) {
      setKiborValue(value);
    }
  };

  // Only allow numeric input Swap
  const handleInputChangeSwap = (e) => {
    const value = e.target.value;

    // Allow up to 2 digits before decimal and up to 4 digits after decimal
    if (/^\d{0,2}(\.\d{0,4})?$/.test(value)) {
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

  //Calculate Non Fx Discounting API Call
  const handleNonFxDiscounting = () => {
    if (selectedOption !== null) {
      let Data = {
        Ready: Number(price),
        Tenor: Number(inputValue),
        Swap: Number(swapValue),
        Kibor: Number(kiborValue),
        Currency: selectedOption.label,
      };
      dispatch(CalculateNonFxDiscountingAPI({ Data, navigate }));
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
                onChange={handleChangeCurrencyCalculator}
                placeholder="Select a currency"
              />

              <label className="mt-1">Ready</label>
              <InputFIeld
                type="number"
                name="price"
                defaultValue="0"
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
                {CalculatedNonFxDiscounting}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorNonFxDiscounting;
